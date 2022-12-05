
#this is a react.js container for the frontend of this application. 

FROM node:16-alpine


WORKDIR /usr/src/app/frontend

COPY package*.json ./



RUN npm install --silent




COPY . .



EXPOSE 3000

CMD ["npm","start"]