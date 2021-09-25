FROM node
WORKDIR /app
COPY /dist /app
COPY package.json /app
RUN npm install
CMD node index.js