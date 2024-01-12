FROM node:20-alpine

USER node
WORKDIR /home/node/app
COPY --chown=node:node ./.output /home/node/app

EXPOSE 3000

CMD ["node", "/home/node/app/server/index.mjs"]
