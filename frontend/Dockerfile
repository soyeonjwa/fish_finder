FROM node:20.10.0

RUN yarn global add serve

RUN mkdir ./build

COPY ./build ./build

EXPOSE 8020

CMD ["serve", "-s", "build"]