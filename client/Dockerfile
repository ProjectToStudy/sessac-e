FROM node:16.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

CMD ["npm", "run", "start"]

