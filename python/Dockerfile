# Use a lightweight Python base
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies for OpenCV and builds
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    wget \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install CPU-only PyTorch + torchvision directly
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Copy requirements first for better caching
COPY requirements.txt .

# Install other Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application (including your model folder)
COPY . .

# Railway uses PORT env automatically
ENV PORT=8080
EXPOSE 8080

# Start the app with Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
