#!/usr/bin/env bash

# shellcheck disable=SC2015
[[ "${DEBUG}" = "yes" ]] && set -ex || set -e
[[ "${DEBUG}" = "yes" ]] && env

[[ ! -f "${PWD}/package.json" ]] && echo -e "${PWD}/package.json not found!\n" && exit 1

ng analytics disable

sudo find /etc -type f -name "my.cnf"

[[ ! -d "./node_modules" ]] && yarn install

yarn start
# yarn ssr-build && yarn sls-local
