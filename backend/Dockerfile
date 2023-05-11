# Use the official Node.js 14 image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's code to the container
COPY . .

# Expose the port that the app will listen on
EXPOSE 8000


# Start the app when the container starts
CMD ["npm", "start"]
