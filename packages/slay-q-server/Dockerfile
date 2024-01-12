FROM node:20-alpine

USER node
WORKDIR /home/node/app

RUN npm init -y
RUN npm install @slay-pics/slay-q-server

CMD ["/home/node/app/node_modules/.bin/slay-q-server", "/home/node/app/slay-config.json"]

