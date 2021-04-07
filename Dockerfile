FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

CMD [ "node", "server.js" ]
