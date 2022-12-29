#picking up node with its version
FROM node:16

# Create container working directory 
WORKDIR /src/app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]