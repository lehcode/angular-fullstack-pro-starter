ARG node_version
FROM node:${node_version} AS install

ARG debug
ARG nestjs_version
ARG node_env
ARG tz
ARG workdir

ENV DEBUG=${debug}
ENV NESTJS_VERSION=${nestjs_version}
ENV NODE_ENV=${node_env}
ENV NODE_VERSION=${node_version}

RUN set -ex \
  && chown -R node:node /usr/local/lib/node_modules \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -y install sudo \
  && apt-get clean \
  && sh -c 'echo "node ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers' \
  && npm install -g npm \
  && npm --force install -g yarn \
  && env

COPY entrypoint.sh /init.sh

USER node:node
RUN set -ex \
  && echo "Node.js version: "$(node -v) \
  && echo "NPM binary &version: $(npm bin):$(npm -v)" \
  && echo "Yarn binary & version: $(yarn global bin):$(yarn --version)" \
  && yarn global add @nestjs/cli@${nestjs_version} serverless@0.5

WORKDIR ${workdir}

#---
#FROM node:10-slim AS release
#
#ARG workdir
#
#WORKDIR ${workdir}
#
#COPY --from=install ${workdir}/dist .
#
#RUN env \
# && chown -R node:node ../${workdir}
#
#USER node
