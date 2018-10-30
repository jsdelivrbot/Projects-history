FROM node:8

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL warn

COPY . .
RUN npm install --no-optional

EXPOSE 8080

ENTRYPOINT ["npm", "run", "prod"]