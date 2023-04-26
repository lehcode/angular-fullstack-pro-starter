FROM redis:latest

# This Dockerfile is used to create a Redis Server container image. It is maintained by lehcode and contains
# an entrypoint.sh file that is used as an initialization script.

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="Redis Server"

COPY entrypoint.sh /init.sh

ARG tz
ENV TZ=${tz}
