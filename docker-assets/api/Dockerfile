ARG node_version
FROM node:${node_version} AS install

ARG debug
ARG node_version
ARG nestjs_version
ARG node_env
ARG tz
ARG workdir

ENV DEBUG=${debug}
ENV NESTJS_VERSION=${nestjs_version}
ENV NODE_ENV=${node_env}
ENV NODE_VERSION=${node_version}
ENV CONTAINER_WORKDIR=${workdir}

RUN if [ "${debug}" != "yes" ]; then set -e; else set -ex; fi \
  && if [ "${debug}" != "yes" ]; then env; fi \
  && sh -c 'export DEBIAN_FRONTEND="noninteractive"' \
  && wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - \
  && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -y --no-install-recommends --no-install-suggests install sudo lsb-release curl tzdata locales gnupg mongodb-mongosh \
  && ln -fs /usr/share/zoneinfo/${tz} /etc/localtime \
  && echo ${tz} > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata \
  && apt-get clean \
  && echo "node ALL=(ALL) NOPASSWD: ALL" | tee -a /etc/sudoers \
  && npm install -g npm \
  && echo "Node.js version: "$(node -v) \
  && echo "NPM binary &version: $(npm bin):$(npm -v)" \
  && npm --force install -g yarn \
  && echo "Yarn binary & version: $(yarn global bin):$(yarn --version)" \
  && yarn global add @nestjs/cli@${nestjs_version} serverless \
  && echo "NestJS binary & version: $(which nest):$(nest --version)"

COPY entrypoint.sh /init.sh
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
