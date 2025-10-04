from fastapi import FastAPI, File, UploadFile, HTTPException, Response
from process import predict_clothing_type_fashionclip, rgb_to_color_name, CLOTHING_CLASSES, resize_clothing
from PIL import Image
import numpy as np
from io import BytesIO

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Server is working"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Open image
        img = Image.open(file.file).convert("RGBA")

        # Predict clothing type
        pred_type = predict_clothing_type_fashionclip(img)
        print("Prediction type:", pred_type)

        # Resize with transparent background
        img_resized = resize_clothing(img, pred_type)  # Make sure your resize_clothing returns RGBA canvas

        # Determine dominant color
        img_array = np.array(img_resized)
        alpha_mask = img_array[..., 3] > 0  # Only non-transparent pixels
        if np.any(alpha_mask):
            dominant_rgb = img_array[..., :3][alpha_mask].mean(axis=0).astype(int)
        else:
            dominant_rgb = np.array([255, 255, 255])
        dominant_color_name = rgb_to_color_name(dominant_rgb)
        print("Dominant RGB:", dominant_rgb)
        print("Dominant color name:", dominant_color_name)

        # Metadata
        cloth_data = next((c for c in CLOTHING_CLASSES if c["name"] == pred_type), None)
        season = cloth_data["season"] if cloth_data else "all seasons"
        category = cloth_data["category"] if cloth_data else "top"

        # Save to buffer
        buf = BytesIO()
        img_resized.save(buf, format="WEBP", lossless=True)
        buf.seek(0)

        headers = {
            "Clothing-Type": pred_type,
            "Clothing-Color": dominant_color_name,
            "Clothing-Category": category,
            "Clothing-Season": season
        }

        return Response(content=buf.getvalue(), media_type="image/webp", headers=headers)

    except Exception as e:
        print("ERROR in /predict:", e)
        raise HTTPException(status_code=500, detail=str(e))
