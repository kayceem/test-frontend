FROM node:18-alpine

WORKDIR /react-vite-app

EXPOSE 8000

COPY package.json package-lock.json ./ 

RUN yarn

COPY . ./

CMD ["yarn", "dev"]