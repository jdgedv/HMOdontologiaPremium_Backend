FROM node:18-alpine 
WORKDIR /app 
COPY . .
ENV MONGO_URI mongodb://mongo:27017/mongo
RUN npm install --production 
CMD ["node", "app.js"]
EXPOSE 3000