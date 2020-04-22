FROM node:latest
RUN npm install -g create-react-app
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY ./client /home/node/app
RUN npm install
ENV PATH="/home/node/app/node_modules:${PATH}"

CMD ["npm", "start"]