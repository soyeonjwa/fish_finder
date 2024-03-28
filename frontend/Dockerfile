FROM node:20.10.0

RUN yarn global add serve

RUN mkdir ./build

COPY . .

CMD [ "serve", "-s", "build"]
