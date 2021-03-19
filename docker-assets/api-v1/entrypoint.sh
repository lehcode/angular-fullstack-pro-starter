#!/bin/bash

[[ ${DEBUG} = "yes" ]] && set -ex || set -e
[[ ${DEBUG} = "yes" ]] && env

[[ ! -f "${PWD}/package.json" ]] && echo -e "${PWD}/package.json not found!\n" && exit 1
[[ ! -d "./node_modules" ]] && yarn install

yarn start
