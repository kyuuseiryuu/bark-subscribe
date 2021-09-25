FROM node
WORKDIR /app
COPY ./dist /app
ENTRYPOINT ["/usr/local/bin/node", "/app/index.js"]