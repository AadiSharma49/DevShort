# Use Node.js 18 image
FROM node:18

# Create and set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (for caching)
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code
COPY backend .

# Expose backend port
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
