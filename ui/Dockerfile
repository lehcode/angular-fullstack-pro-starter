FROM node:10-buster AS install

ARG tz
ARG workdir

VOLUME ${workdir}
WORKDIR ${workdir}

RUN set -ex \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && curl -qs https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee "/etc/apt/sources.list.d/yarn.list" \
  && sh -c 'export DEBIAN_FRONTEND="noninteractive"' \
  && env \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get -yq install --no-install-suggests yarn sudo google-chrome-stable fonts-liberation libappindicator3-1 \
    libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 \
    libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libnss3-tools libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
    libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils \
  && apt-get clean \
  && sh -c 'echo "node ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers' \
  && npm config set scripts-prepend-node-path auto \
  && echo "Chrome binary: "$(which google-chrome) \
  && echo "Node.js version: "${NODE_VERSION} \
  && echo "Yarn version: "${YARN_VERSION} \
  && echo "Yarn binary: "$(which yarn) \
  && echo "NPM: version: "$(npm -v) \
  && echo "NPM binary: "$(which npm) \
  && env \
  && yarn global add @angular/cli serverless \
  && echo fs.inotify.max_user_watches=524288 | tee /etc/sysctl.d/40-max-user-watches.conf #Fix change watch issue

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
