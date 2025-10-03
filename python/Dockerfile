# Use a lightweight Python image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies for OpenCV and general builds
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    wget \
    git \
    git-lfs \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Initialize Git LFS
RUN git lfs install

# Copy requirements first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Pull LFS files (important: run this *after* copying code so model gets pulled)
RUN git lfs pull

# Expose port (Railway uses $PORT)
ENV PORT=8080
EXPOSE 8080

# Command to run the app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
