FROM python:3.13-slim

WORKDIR /app

# Set UTF-8 locale
ENV PYTHONUTF8=1

# System dependencies + git + git-lfs
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    wget \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Git LFS
RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash
RUN apt-get install -y git-lfs
RUN git lfs install

# Install CPU-only PyTorch + torchvision
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Copy repository files
COPY . .

# Pull Git LFS files (this will fetch .pth files properly)
RUN git lfs pull || echo "Git LFS pull failed, make sure LFS objects exist"

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Railway port
ENV PORT=8080
EXPOSE 8080

# Run Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
