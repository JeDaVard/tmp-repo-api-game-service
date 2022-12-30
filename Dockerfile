FROM node:16-alpine AS dependencies

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN npm i @nestjs/cli --location=global
RUN yarn install --production

COPY . .

RUN yarn build

## clean image which does not expose our .npmrc etc..
FROM node:16-alpine

WORKDIR /home/node/app

EXPOSE 3000

RUN chown -R node:node /home/node/app
COPY --chown=node:node --from=dependencies /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=dependencies /home/node/app/dist ./
COPY --chown=node:node --from=dependencies /home/node/app/package.json ./
COPY --chown=node:node --from=dependencies /home/node/app/yarn.lock ./

ARG BUILD_NR
ARG BUILD_DATE
ARG BUILD_BRANCH
ARG BUILD_COMMIT
ENV BUILD_NR=${BUILD_NR} \
    BUILD_DATE=${BUILD_DATE} \
    BUILD_BRANCH=${BUILD_BRANCH} \
    BUILD_COMMIT=${BUILD_COMMIT} \
    PROJECT_ROOT_PATH=/home/node/app
USER 1000
WORKDIR /home/node/app

CMD ["yarn", "start:prod"]
