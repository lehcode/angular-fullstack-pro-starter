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

RUN if [ "${debug}" != "yes" ]; then set -e; else set -ex; fi \
  && curl -qs https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google.list \
  && sh -c 'export DEBIAN_FRONTEND="noninteractive"' \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -yq install --no-install-recommends --no-install-suggests sudo lsb-release xdg-utils google-chrome-stable curl \
  && apt-get clean \
  && ln -fs /usr/share/zoneinfo/${tz} /etc/localtime \
  && echo ${tz} > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata \
  && echo "node ALL=(ALL) NOPASSWD: ALL" | tee -a /etc/sudoers \
  && npm install -g npm \
  && npm --force install -g yarn \
  && echo fs.inotify.max_user_watches=524288 | tee /etc/sysctl.d/40-max-user-watches.conf

COPY entrypoint.sh /init.sh

USER node:node

RUN if [ "${debug}" != "yes" ]; then set -e; else set -ex; fi \
  && echo "Node.js version: "$(node -v) \
  && echo "NPM binary &version: $(npm bin):$(npm -v)" \
  && echo "Yarn binary & version: $(yarn global bin):$(yarn --version)" \
  && yarn global add @angular/cli@${angular_version} serverless@latest  \
  && echo "Angular CLI binary & version: $(which ng):$(ng version)"

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
