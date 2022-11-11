#  Dockerfile for Node Express Backend

FROM node:latest

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

ENV NODE_ENV = development
ENV PORT = 5000
ENV MONGO_URI = mongodb+srv://ibie1234:ibie1234@newcluster.zscri.mongodb.net/SGIA?retryWrites=true&w=majority
ENV JWT_SECRET = abc123
ENV PAYPAL_CLIENT_ID = AaB2gY73ZsCVIz-vx2iDL6sNNMzzYXbiUxwoP8frO7YDCk3OkW4xc9hDc5jwlQB_3kTEmF7EKSWv47Zh

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]