import * as ort from "onnxruntime-web/webgpu";
// undebugable, literally cant even understand this, the only reason why it works is because it got parsed from python to ts.
let session: ort.InferenceSession | null = null;
let sessionLoading: Promise<ort.InferenceSession> | null = null;


async function getSession() {
  if (session) return session;
  if (sessionLoading) return sessionLoading; 

  console.log("Loading ONNX session...");

  sessionLoading = ort.InferenceSession.create("/cloth_segm.onnx", {
    executionProviders: ["webgpu"], 
  }).then(s => {
    console.log("ONNX session loaded.");
    session = s;
    return s;
  });

  return sessionLoading;
}

export async function segmentClothingAndCrop(imageSrc: string): Promise<string> {

  const session = await getSession();
  
  // Load image
  const img = await new Promise<HTMLImageElement>((resolve) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.src = imageSrc;
    i.onload = () => resolve(i);
  });

  // Preprocess to 768x768
  const width = 768;
  const height = 768;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d",{alpha:true})!;
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;

  // Convert image to tensor
  const tensorData = new Float32Array(3 * width * height);
  for (let i = 0; i < width * height; i++) {
    tensorData[i] = imageData[i * 4] / 255;          // R
    tensorData[i + width * height] = imageData[i * 4 + 1] / 255; // G
    tensorData[i + 2 * width * height] = imageData[i * 4 + 2] / 255; // B
  }
  const inputTensor = new ort.Tensor("float32", tensorData, [1, 3, width, height]);

  // Run inference
  const results = await session.run({ [session.inputNames[0]]: inputTensor });
  const outputTensor = results[session.outputNames[0]] as ort.Tensor;
  const data = outputTensor.data as Float32Array;
  const [_, channels, h, w] = outputTensor.dims;

  // Build mask for clothing (channels 1+2)
  const mask = new Uint8ClampedArray(h * w);
  for (let i = 0; i < h * w; i++) {
    let bestC = 0;
    let bestVal = data[i];
    for (let c = 1; c < channels; c++) {
      const v = data[c * h * w + i];
      if (v > bestVal) {
        bestVal = v;
        bestC = c;
      }
    }
    mask[i] = bestC !==0 ? 255 : 0;
  }

  // Resize mask to original image size
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = w;
  maskCanvas.height = h;
  const maskCtx = maskCanvas.getContext("2d")!;
  const maskImgData = maskCtx.createImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    const v = mask[i];
    maskImgData.data[i * 4] = v;
    maskImgData.data[i * 4 + 1] = v;
    maskImgData.data[i * 4 + 2] = v;
    maskImgData.data[i * 4 + 3] = 255;
  }
  maskCtx.putImageData(maskImgData, 0, 0);

  const scaledCanvas = document.createElement("canvas");
  scaledCanvas.width = img.width;
  scaledCanvas.height = img.height;
  const sctx = scaledCanvas.getContext("2d")!;
  sctx.drawImage(maskCanvas, 0, 0, img.width, img.height);

  const scaledImgData = sctx.getImageData(0, 0, img.width, img.height).data;
  const resizedMask = new Uint8ClampedArray(img.width * img.height);
  for (let i = 0; i < img.width * img.height; i++) {
    resizedMask[i] = scaledImgData[i * 4];
  }

  // Apply mask as alpha (transparent background)
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = img.width;
  finalCanvas.height = img.height;
  const fctx = finalCanvas.getContext("2d")!;
  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = img.width;
  imgCanvas.height = img.height;
  const ictx = imgCanvas.getContext("2d")!;
  ictx.drawImage(img, 0, 0, img.width, img.height);
  const rgbaData = ictx.getImageData(0, 0, img.width, img.height);

  const finalData = fctx.createImageData(finalCanvas.width, finalCanvas.height);
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const idx = y * img.width + x;
      finalData.data[idx * 4] = rgbaData.data[idx * 4];       // R
      finalData.data[idx * 4 + 1] = rgbaData.data[idx * 4 + 1]; // G
      finalData.data[idx * 4 + 2] = rgbaData.data[idx * 4 + 2]; // B
      finalData.data[idx * 4 + 3] = resizedMask[idx];           // Alpha = mask
    }
  }
  fctx.putImageData(finalData, 0, 0);

  // Debug logs
  console.log("Image size:", img.width, img.height);
  console.log("Mask unique values:", Array.from(new Set(resizedMask)));

  return finalCanvas.toDataURL("image/png", 0.9);
}
