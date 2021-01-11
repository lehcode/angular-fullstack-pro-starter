FROM mysql:8.0

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="MySQL database server"

RUN sed -i "s/^.*Custom config should go here$/port=3306\\r\\nbind-address=0.0.0.0\\r\\n# Custom config should go here/" /etc/mysql/my.cnf
