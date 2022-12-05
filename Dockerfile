
#This is a node.js container for the backend/api of this application. 

#pull base image from DcokerHub... I am using alipine beacuse of its size, relative to the full node image
FROM node:16-alpine   


#create and set working directory within docker container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#copy package/package-lock to working directory
COPY package*.json ./

#intsall dependancies
RUN npm install --silent



#copy remaing source code to workig directory 
COPY . .

#expose a port for container to listen on
EXPOSE 5000

#run the following command(s) to start service
CMD ["npm","start"]