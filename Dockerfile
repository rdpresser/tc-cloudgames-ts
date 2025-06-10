# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package.json and pnpm-lock.yaml first for better caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript project
RUN pnpm run build

# Expose the port your Fastify app listens on
EXPOSE 3000
#EXPOSE 9229

# Set environment variables (override as needed)
ENV NODE_ENV=production

# Start the application
CMD ["pnpm", "run", "start"]
#CMD ["node", "--inspect=0.0.0.0:9229", "dist/index.js"]
