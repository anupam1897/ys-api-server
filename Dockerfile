FROM node:alpine
ENV API_SERVER_PORT 3000
COPY . /app 
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 3000
CMD node api-resource-server
