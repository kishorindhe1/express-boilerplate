FROM node:18

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose port
EXPOSE 3000

# Run Prisma migrations in dev mode and start app
CMD npm run migrate:dev && npm run dev
