FROM node:10-buster AS install

ARG workdir
ARG tz
ARG node_env

ENV NODE_ENV=${node_env}

VOLUME ${workdir}
WORKDIR ${workdir}

RUN set -ex \
  && usermod -a -G audio,video node \
  && mkdir -p /home/node/Downloads \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee "/etc/apt/sources.list.d/yarn.list" \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -y install yarn sudo \
  && apt-get clean \
  && sh -c 'echo "node ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers' \
  && npm config set scripts-prepend-node-path auto \
  && echo "Node.js version: "${NODE_VERSION} \
  && echo "Yarn version: "${YARN_VERSION} \
  && echo "Yarn binary: "$(yarn global bin) \
  && echo "NPM: version: "$(npm -v) \
  && echo "NPM binary: "$(npm bin) \
  && env \
  && yarn global add @nestjs/cli serverless

USER node

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
