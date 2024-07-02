FROM node

# Set environment variable
ENV REACT_APP_BASE_URL="/nodejs-service"

# Copy package.json and install dependencies
COPY package.json package.json
RUN npm install 

# Copy the rest of the application code
COPY . .

# Command to start the application
CMD npm start
EXPOSE 3000


# Stage 1: Build stage
# FROM node:alpine AS build


# # Copy package.json and package-lock.json and install dependencies
# COPY package*.json ./

# # Copy the rest of the application code
# COPY . .
# ENV REACT_APP_BASE_URL="/nodejs-service"


# # Build the application
# RUN npm install

# CMD [ "npm start" ]
