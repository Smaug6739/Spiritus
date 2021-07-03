FROM node:14.13.1
WORKDIR /dist


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
RUN npm i canvas
# add app
COPY . ./

# start app
CMD ["npm", "start"]