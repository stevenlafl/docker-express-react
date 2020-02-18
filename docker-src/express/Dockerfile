FROM node:latest
RUN npm install -g nodemon
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY ./api /home/node/app
RUN npm install
ENV PATH="/home/node/app/node_modules:${PATH}"

CMD ["nodemon", "npm", "start"]