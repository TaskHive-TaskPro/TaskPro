# Node.js tabanlı fullstack örnek Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000 3000
CMD ["npm", "start"]
