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
ENV CONTAINER_WORKDIR=${workdir}
ENV MONGO_USER=${mongo_user}
ENV MONGO_PASS=${mongo_pass}

RUN if [ "${debug}" != "yes" ]; then set -e; else set -ex; fi \
  && sh -c 'export DEBIAN_FRONTEND="noninteractive"' \
  && wget -qO - "https://www.mongodb.org/static/pgp/server-${mongo_version}.asc" | apt-key add - \
  && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/${mongo_version} multiverse" | tee "/etc/apt/sources.list.d/mongodb-org-${mongo_version}.list" \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -y --no-install-recommends --no-install-suggests install sudo lsb-release curl tzdata locales gnupg mongodb-mongosh ca-certificates \
  && ln -fs /usr/share/zoneinfo/${tz} /etc/localtime \
  && echo ${tz} > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata \
  && apt-get clean \
  && echo -e "${user}\t\tALL=(ALL:ALL)\tNOPASSWD:ALL" | tee -a /etc/sudoers \
  && npm install -g npm \
  && echo "Node.js version: "$(node -v) \
  && echo "NPM binary & version: $(npm bin):$(npm -v)" \
  && npm --force install -g yarn \
  && echo "Yarn binary & version: $(yarn global bin):$(yarn --version)" \
  && yarn global add @nestjs/cli@${nestjs_version} serverless \
  && echo "NestJS binary & version: $(which nest):$(nest --version)"

COPY entrypoint.sh /init.sh
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
