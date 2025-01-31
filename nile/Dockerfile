# Use Node.js official image as base image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
# RUN npm install
RUN npm install --legacy-peer-deps

# Copy all the source files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
