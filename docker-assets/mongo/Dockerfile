ARG mongo_version
FROM mongo:${mongo_version}

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="MongoDB server"

ARG tz
ARG port
ARG logpath
ARG mongo_user
ARG mongo_pass
ARG debug
ARG telemetry
ARG db
ARG collections
ARG root_user
ARG root_pass

RUN if [ "${debug}" != "yes" ]; then set -e; else set -ex; fi \
    && chmod 755 /init.sh \
    && apt-get update \
    && apt-get install -y tzdata locales ca-certificates \
    && apt-get -y upgrade \
    && apt-get clean \
    && ln -fs /usr/share/zoneinfo/${tz} /etc/localtime \
    && echo ${tz} > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \
    && cp /etc/mongod.conf.orig /etc/mongod.conf \
    && echo "vm.max_map_count=102400" | tee -a /etc/sysctl.conf \
    && mongod --fork --logpath ${logpath} --port ${port} \
    && sleep 1 \
    && if [ "${telemetry}" = "no" ]; then mongosh --nodb --eval "disableTelemetry()"; fi \
    && if [ "${debug}" != "no" ]; then env; fi \
    && mongosh /initdb.js
