#picking up node with its version
FROM node:16

# Create container working directory 
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -D nodemon

COPY . .

RUN echo "127.0.0.1 postgres" >> /etc/hosts

CMD ["npm", "start"]