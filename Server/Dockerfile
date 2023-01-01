#picking up node with its version
FROM node:16

# Create container working directory 
WORKDIR /src/app


COPY package*.json ./

COPY . .

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 5000

CMD /wait &&  npm start