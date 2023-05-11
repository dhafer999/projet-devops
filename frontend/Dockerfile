# Use an official Node.js runtime as a parent image
FROM node:14.16.1-alpine3.13 as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/sites-avaialbe/default.conf

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Set environment variables for runtime configuration
ENV API_URL="http://example.com/api"

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
