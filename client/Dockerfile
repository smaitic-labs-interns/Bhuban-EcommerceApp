#picking up node with its version
FROM node:16

# Create container working directory 
WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]