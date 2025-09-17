from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import Response
from PIL import Image
from io import BytesIO
import numpy as np
import torch
from process import load_seg_model, get_palette, generate_mask,predict_clothing_type_fashionclip,rgb_to_color_name, predict_if_top_or_bottom, determine_season

app = FastAPI()

device = 'cuda' if torch.cuda.is_available() else 'cpu'
net = load_seg_model("model/cloth_segm.pth", device=device)
palette = get_palette(4)
@app.get('/')
async def root():
    return {"messgage":"sever is working with no problem"}
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        img = Image.open(file.file).convert("RGB")
        w, h = img.size
        
        # Generate segmentation mask
        mask_img = generate_mask(img, net=net, palette=palette, device=device)

        #Convert mask to a gray color so we can identify which part to crop out
        mask_gray = mask_img.convert("L")
        mask_array = np.array(mask_gray)

        #we might need to adjust the 50 if the clothes aren't being picked up
        binary_mask = (mask_array > 10).astype(np.uint8) * 255  

        
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

        #if the clothes isn't fully in the image we might not be able to crop it
        #prevent cropping out of boundary
        bbox = Image.fromarray(binary_mask).getbbox()
        if bbox:
            x0, y0, x1, y1 = bbox
            if (x1 - x0) > 20 and (y1 - y0) > 20:
                img_rgba = img_rgba.crop(bbox)
        
        rgba_array = np.array(img_rgba)


        pred_type = predict_clothing_type_fashionclip(img_rgba)
        is_top = predict_if_top_or_bottom(pred_type)
        season = determine_season(pred_type)

        mask = rgba_array[:, :, 3] > 0  # only non-transparent pixels

        #color recongnition needs to be improved, maybe more categories of colors
        if np.any(mask):
            rgb_pixels = rgba_array[mask][:, :3]
            dominant_rgb = np.mean(rgb_pixels, axis=0).astype(int)
            dominant_color_name = rgb_to_color_name(dominant_rgb)
        else:
            dominant_rgb = None
            dominant_color_name = "unknown"


        buf = BytesIO()


        #debug
        print("Dominant RGB:", dominant_rgb)
        print("Dominant color name:", dominant_color_name)
        print("Prediction type:",pred_type)
        print("Is top:", is_top)
        print("Season:", season)
        print("Mask unique values:", np.unique(binary_mask))
        print("Alpha channel min/max:", rgba_array[:, :, 3].min(), rgba_array[:, :, 3].max())
        print("RGB channel mean:", rgba_array[:, :, :3].mean())

        img_rgba.save(buf, format="WEBP",lossless=True)

        #temp testing to see the output, we might need to fine tune the mask or our cropping ability
        img_rgba.save("output/output.png")
        buf.seek(0)

        headers = {
            "Clothing-Type":pred_type,
            "Clothing-Color":dominant_color_name,
            "Is-Top": is_top,
            "Season": season
        }

        return Response(content=buf.getvalue(), media_type="image/WEBP",headers=headers)

    except Exception as e:
        print("ERROR in /predict:", e)
        raise HTTPException(status_code=500, detail=str(e))
