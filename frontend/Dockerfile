FROM node:20-slim

WORKDIR /app

# Copy package.json & install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
