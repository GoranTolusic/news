FROM node:latest

# Create books directory
WORKDIR /usr/src/news

#copy package.json to workdir
COPY package.json ./

#install dependencies
RUN npm install

#copy application files to workdir
COPY . .

#expose application port
EXPOSE 3000

#run application 
CMD [ "npm", "start" ]