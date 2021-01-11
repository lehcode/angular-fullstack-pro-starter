FROM mongo:4.4-bionic

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="MongoDB server"

RUN apt-get update \
    && apt-get install -y tzdata locales \
    && apt-get clean \
    && ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \
    && apt-get -y upgrade \
    && apt-get -y install curl wget build-essential apt-transport-https dumb-init \
    && cp /etc/mongod.conf.orig /etc/mongod.conf \
    && sed -i 's/bindIp: 127\.0\.0\.1/bindIp: 0\.0\.0\.0/g' /etc/mongod.conf

EXPOSE 27017:27017/tcp
EXPOSE 27018:27018/tcp
EXPOSE 27019:27019/tcp
