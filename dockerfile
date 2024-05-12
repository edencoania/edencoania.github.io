FROM node

# Set environment variable

# Copy package.json and install dependencies
COPY package.json package.json
RUN npm install 

# Copy the rest of the application code
COPY . .
ENV BASE_URL=http://localhost:8000

# Command to start the application
CMD npm start
EXPOSE 3000