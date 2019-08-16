FROM node:latest
ENV NODE_PATH=/opt/node_modules

WORKDIR /opt
COPY package.json .
RUN npm install && npm install -g nodemon

RUN mkdir /html
WORKDIR /html

ENTRYPOINT npm run build