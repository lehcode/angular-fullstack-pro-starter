#!/usr/bin/env bash

sysctl vm.overcommit_memory=1
redis-server /usr/local/etc/redis/redis.conf