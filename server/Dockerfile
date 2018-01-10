FROM node:6
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app/
COPY package.json /usr/src/app
RUN npm install
COPY ./dist/ /usr/src/app/dist
EXPOSE 3000
CMD ["npm", "start"]