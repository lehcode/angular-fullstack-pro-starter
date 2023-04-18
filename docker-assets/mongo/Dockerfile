ARG mongo_version
FROM mongo:${mongo_version}

ENV MONGO_VERSION=${mongo_version}
ARG tz
ENV TZ=${tz}

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="MongoDB server"

RUN apt-get update \
    && apt-get install -y tzdata locales \
    && apt-get clean \
    && ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \
    && apt-get -y upgrade \
    && cp /etc/mongod.conf.orig /etc/mongod.conf \
    && sed -i 's/bindIp: 127\.0\.0\.1/bindIp: 0\.0\.0\.0/g' /etc/mongod.conf \
    && echo "vm.max_map_count=102400" | tee -a /etc/sysctl.conf
