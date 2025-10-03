FROM python:3.13-slim

WORKDIR /app

# Set UTF-8 locale
ENV PYTHONUTF8=1

# System dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    wget \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install CPU-only PyTorch + torchvision
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Railway port
ENV PORT=8080
EXPOSE 8080

# Run Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
