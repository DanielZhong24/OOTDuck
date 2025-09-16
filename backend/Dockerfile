FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json tsconfig.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend with tsx watch
CMD ["npm", "run", "dev"]
