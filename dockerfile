# FROM node

# Set environment variable

# Copy package.json and install dependencies
# COPY package.json package.json
# RUN npm install 

# Copy the rest of the application code
# COPY . .

# Command to start the application
# CMD npm start
# EXPOSE 3000


# Stage 1: Build stage
FROM node:alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .
ENV REACT_APP_BASE_URL="/nodejs-service"


# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx

# Copy the build output from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
