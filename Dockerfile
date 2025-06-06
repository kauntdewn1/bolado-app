FROM node:18-slim

WORKDIR /app

COPY . .

RUN apt-get update && apt-get upgrade -y && apt-get clean
RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"] 