FROM node:alpine

COPY . /app 
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 3000
CMD node api-resource-server
