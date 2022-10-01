FROM node:16.16-alpine3.15

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY src/*.js /app/src/
COPY ./config/config.json /app/config/

ENTRYPOINT [ "npm", "run", "start" ]
