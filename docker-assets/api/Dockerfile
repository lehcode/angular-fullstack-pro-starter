ARG node_version
FROM node:${node_version} AS install

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="NestJS API server"

ARG debug
ARG node_version
ARG nestjs_version
ARG node_env
ARG tz
ARG workdir
ARG mongo_version
ARG mongo_user
ARG mongo_pass

ENV DEBUG=${debug}
ENV NESTJS_VERSION=${nestjs_version}
ENV NODE_ENV=${node_env}
ENV NODE_VERSION=${node_version}

RUN if [ "${debug}" != "yes" ]; then set -e; else set -ex; fi \
  && sh -c 'export DEBIAN_FRONTEND="noninteractive"' \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -y --no-install-recommends --no-install-suggests install sudo lsb-release curl tzdata locales \
  && ln -fs /usr/share/zoneinfo/${tz} /etc/localtime \
  && echo ${tz} > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata \
  && apt-get clean \
  && echo "node ALL=(ALL) NOPASSWD: ALL" | sudo tee -a /etc/sudoers \
#  && chown -R node:node /usr/local/lib/node_modules \
  && npm install -g npm \
  && npm --force install -g yarn \
  && echo "Node.js version: "$(node -v) \
  && echo "NPM binary &version: $(npm bin):$(npm -v)" \
  && echo "Yarn binary & version: $(yarn global bin):$(yarn --version)" \
  && yarn global add @nestjs/cli@${nestjs_version} serverless \
  && echo "NestJS binary & version: $(which nest):$(nest --version)"

COPY entrypoint.sh /init.sh
USER node:node
WORKDIR ${workdir}
USER ${user}:${group}

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
