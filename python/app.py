from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import Response
from PIL import Image
from io import BytesIO
import numpy as np
import torch

from process import load_seg_model, get_palette, generate_mask

app = FastAPI()

device = 'cuda' if torch.cuda.is_available() else 'cpu'
net = load_seg_model("model/cloth_segm.pth", device=device)
palette = get_palette(4)
@app.get('/')
async def root():
    return {"messgage":"hi"}
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Load image
        img = Image.open(file.file).convert("RGB")
        w, h = img.size

        # Generate segmentation mask
        mask_img = generate_mask(img, net=net, palette=palette, device=device)

        #Convert mask to binary 
        mask_gray = mask_img.convert("L")
        mask_array = np.array(mask_gray)
        binary_mask = (mask_array > 50).astype(np.uint8) * 255  # lower threshold for faint detection

        # Resize mask to match original image if needed
        if binary_mask.shape != (h, w):
            binary_mask = np.array(Image.fromarray(binary_mask).resize((w, h)))

        # Create transparent RGBA image
        img_array = np.array(img)   
        # fully transparent
        rgba_array = np.zeros((h, w, 4), dtype=np.uint8)       
        rgba_array[:, :, :3] = img_array                        # copy RGB
        rgba_array[:, :, 3] = binary_mask                       # set alpha

        img_rgba = Image.fromarray(rgba_array, mode="RGBA")

        # Optional: crop to bounding box of cloth
        bbox = Image.fromarray(binary_mask).getbbox()
        if bbox:
            img_rgba = img_rgba.crop(bbox)

        # Return transparent PNG
        buf = BytesIO()
        img_rgba.save(buf, format="PNG")
        buf.seek(0)
        return Response(content=buf.getvalue(), media_type="image/png")

    except Exception as e:
        print("ERROR in /predict:", e)
        raise HTTPException(status_code=500, detail=str(e))
