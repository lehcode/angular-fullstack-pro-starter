ARG node_version
FROM node:${node_version} AS install

ARG angular_version
ARG debug
ARG tz
ARG workdir

ENV ANGULAR_VERSION=${angular_version}
ENV DEBUG=${debug}
ENV NODE_VERSION=${node_version}
ENV TZ=${tz}

WORKDIR ${workdir}

RUN set -ex \
  && curl -qs https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google.list \
  && sh -c 'export DEBIAN_FRONTEND="noninteractive"' \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -yq install --no-install-recommends --no-install-suggests sudo lsb-release xdg-utils google-chrome-stable \
  && apt-get clean \
  && echo "node ALL=(ALL) NOPASSWD: ALL" | tee -a /etc/sudoers \
  && npm install -g npm \
  && npm --force install -g yarn \
  && env \
  && yarn global add @angular/cli@${angular_version} serverless@0.5 \
  && echo fs.inotify.max_user_watches=524288 | tee /etc/sysctl.d/40-max-user-watches.conf

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
#  && chown -R node:node ../${workdir}
#
#USER node
