FROM python:3.12-bullseye

WORKDIR /app

# Install system dependencies for Pillow/OpenCV
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       libgl1-mesa-glx \
       libglib2.0-0 \
       libfreetype6-dev \
       libjpeg62-turbo-dev \
       zlib1g-dev \
       pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /app/tmp

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
