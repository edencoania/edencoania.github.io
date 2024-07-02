# Stage 1: Build stage
FROM node:alpine AS build

# Set environment variable
ENV REACT_APP_BASE_URL="/nodejs-service"

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:alpine

# Set environment variable
ENV REACT_APP_BASE_URL="/nodejs-service"

# Copy only the necessary files from the build stage
COPY --from=build /build /app

# Install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Command to start the application
CMD ["npm", "start"]

EXPOSE 3000
