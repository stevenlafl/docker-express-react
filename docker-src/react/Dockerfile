FROM node:latest
RUN npm install -g create-react-app
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY ./client /home/node/app
RUN npm install

CMD ["npm", "start"]