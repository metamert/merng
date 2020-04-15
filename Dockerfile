FROM node:13.2.0
WORKDIR /skrite15/merng
COPY package*.json ./
RUN npm install

EXPOSE 1616
CMD [ "node", "index" ]
COPY . .