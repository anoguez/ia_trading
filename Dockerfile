FROM node:12-slim
WORKDIR /srv/app
COPY . .
RUN npm install -g pm2 1>/dev/null 2>&1
RUN npm i && npm run build && npm prune --production
CMD npm run start:prod
