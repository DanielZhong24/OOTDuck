# Use Node.js base image
FROM node:20


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Download ONNX model from Google Drive using gdown
RUN apt-get update && \
    apt-get install -y wget unzip python3 && \
    wget --no-check-certificate "https://docs.google.com/uc?export=download&id=1SZx185XDtS6MyHYwRTc5KssF7ijQj3h4" \
    -O public/cloth_segm.onnx

# Verify file exists and size
RUN ls -lh /app/public/cloth_segm.onnx

# Build app
RUN npm run build


# Start the app
CMD ["npm", "run", "start"]
