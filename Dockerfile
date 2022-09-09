FROM node:18.8.0

WORKDIR /src

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

ENV JWT_SECRET=jwtsecret

COPY . .

RUN npm run build

EXPOSE 3333
CMD [ "node", "dist/main" ]