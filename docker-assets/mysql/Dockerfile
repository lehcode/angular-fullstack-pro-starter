ARG mysql_version
FROM mysql:${mysql_version}

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="MySQL database server"

ARG tz
ENV TZ=${tz}
ENV MYSQL_VERSION=${mysql_version}

RUN if [ "${debug}" != "yes" ]; then set -e; else set -ex; fi \
  && ln -fs /usr/share/zoneinfo/${tz} /etc/localtime \
  && echo ${tz} > /etc/timezone
