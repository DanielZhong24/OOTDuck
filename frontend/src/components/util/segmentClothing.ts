import * as ort from "onnxruntime-web/webgl";

let session: ort.InferenceSession | null = null;

export async function segmentClothingAndCrop(imageSrc: string): Promise<string> {
  if (!session) {
    console.log("Loading ONNX session...");
    session = await ort.InferenceSession.create("/cloth_segm.onnx", {
      executionProviders: ["webgl"], // faster & more compatible
    });
    console.log("ONNX session loaded.");
  }

  // Load image
  const img = await new Promise<HTMLImageElement>((resolve) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.src = imageSrc;
    i.onload = () => resolve(i);
  });

  // Resize for model input
  const width = 512;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: true })!;
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;

  // Convert to tensor
  const tensorData = new Float32Array(3 * width * height);
  for (let i = 0; i < width * height; i++) {
    tensorData[i] = imageData[i * 4] / 255;             // R
    tensorData[i + width * height] = imageData[i * 4 + 1] / 255; // G
    tensorData[i + 2 * width * height] = imageData[i * 4 + 2] / 255; // B
  }
  const inputTensor = new ort.Tensor("float32", tensorData, [1, 3, width, height]);

  // Run inference
  const results = await session.run({ [session.inputNames[0]]: inputTensor });
  const outputTensor = results[session.outputNames[0]] as ort.Tensor;
  const data = outputTensor.data as Float32Array;
  const [_, channels, h, w] = outputTensor.dims;

  // Create mask using max channel (ignore background)
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = w;
  maskCanvas.height = h;
  const maskCtx = maskCanvas.getContext("2d")!;
  const maskImgData = maskCtx.createImageData(w, h);

  for (let i = 0; i < h * w; i++) {
    let maxC = 0;
    let maxVal = data[i];
    for (let c = 1; c < channels; c++) {
      const v = data[c * h * w + i];
      if (v > maxVal) {
        maxVal = v;
        maxC = c;
      }
    }
    const alpha = maxC !== 0 ? 255 : 0;
    maskImgData.data[i * 4 + 0] = 255;
    maskImgData.data[i * 4 + 1] = 255;
    maskImgData.data[i * 4 + 2] = 255;
    maskImgData.data[i * 4 + 3] = alpha;
  }
  maskCtx.putImageData(maskImgData, 0, 0);

  // Apply mask on original image using GPU
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = img.width;
  finalCanvas.height = img.height;
  const fctx = finalCanvas.getContext("2d")!;

  // Draw original image
  fctx.drawImage(img, 0, 0, img.width, img.height);

  // Draw mask as alpha
  fctx.globalCompositeOperation = "destination-in";
  fctx.drawImage(maskCanvas, 0, 0, img.width, img.height);

  fctx.globalCompositeOperation = "source-over"; // reset for safety

  return finalCanvas.toDataURL("image/png", 0.9);
}
