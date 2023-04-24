#!/usr/bin/env bash

[[ ${DEBUG} = "yes" ]] && set -ex || set -e
[[ ${DEBUG} = "yes" ]] && env

mongod --auth --nounixsocket \
    --bind_ip ${IP} \
    --port ${PORT}
    --wiredTigerCacheSizeGB ${CACHE_SIZE_GB}
