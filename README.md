# NestJS & Angular Serverless Development Starter Boilerplate

This NestJS and Angular starter boilerplate is designed to help you quickly set up a single application for development 
using Docker Compose, MongoDB, MySQL, Redis, and AWS Lambda. The boilerplate includes configuration for code linting 
and testing pipelines for Bitbucket.

Includes the `docker-compose.yml` file is a configuration file for [Docker Compose](https://docs.docker.com/compose/), 
a tool for defining and running multi-container Docker applications. The file specifies the services (API, UI, MongoDB,
MySQL, Redis) that should be created, and their configurations. 

The system includes both [MongoDB](https://www.mongodb.com/docs/) and [MySQL](https://dev.mysql.com/doc/refman/8.0/en/) 
Docker services, which are used as databases for the NestJS application. Depending on the needs of the application, 
either or both of these services can be used.

The [Redis](https://redis.io/docs/about/) service is used as a caching server for the NestJS application, which can 
improve performance by caching frequently accessed data in memory.

[NestJS](https://docs.nestjs.com/) is a Node.js web framework that is used to build the API service in this system. The
pre-configured connections to MongoDB, MySQL, and Redis allow the NestJS application to interact with these 
services out of the box.

The system includes configuration for [AWS Lambda](https://aws.amazon.com/lambda/) and other cloud services using the 
serverless framework, which is a popular tool for building and deploying serverless applications.

The system also includes code linting and testing pipelines for 
[Bitbucket](https://bitbucket.org/product/features/pipelines), which is a web-based hosting service for
[Git](https://git-scm.com/about) repositories.

## What It Does?
1. Downloads all software images `$ docker compose up`.
2. Creates containers for Docker services: API, UI, MongoDB, MySQL, Redis.
3. Mounts `api` and `ui` directories into API and UI containers respectively. From now on while environment is running, all changes on host filesystem in `api` and `ui` directories will be reflected in containers and vice versa. Folders are unmounted when `Ctrl+C` is pressed in terminal running `docker compose`, or `docker compose down` run.
4. Installs all NPM packages with Yarn.
5. Starts both `api` and `ui` Docker services in watch mode, ready for development.

## What It Provides?
#### NestJS
- [i18n](https://www.i18next.com/overview/getting-started) library and middleware with locale service for working with multiple languages in your nestjs project.
- Authorized administration API endpoints.
- Application configuration service loading config from `.ts` file.
- Application logger service.
- [Mongoose](https://mongoosejs.com/docs/) service.
- AWS Lambda configuration.
- `mongosh` to manually connect to MongoDB if needed and execute queries from command line.

#### Angular
- [Angular Material](https://material.angular.io/guide/getting-started) theme and styling.
- [Compodoc](https://compodoc.app/) documenting.

## Prerequisites
This is simple, as you only need **Docker** with Docker Compose installed on your system and NodeJS>=16.14.0.
Compose should be installed with Docker engine by default. Run `$ docker compose` to see similar output:
```shell
$ docker compose

Usage:  docker compose [OPTIONS] COMMAND
...
```

Check Docker version installed on your system:
```shell
$ docker -v
Docker version 20.10.24, build 297e128
```

## Setup
1. Create project directory `$ mkdir starter`
2. Clone the [NestJS & Angular starter boilerplate repository](https://github.com/lehcode/nest-angular-starter) onto your computer by running the command `$ git clone git@github.com:lehcode/nest-angular-starter.git ./starter` 
3. Copy `docker-compose.yml.dist` to `docker-compose.yml` and update `container_name` property and other values if you need. DO NOT change the `hostname` property as it may break connectivity to servers.
4. Create file `starter/.env` by copying `starter/.env.dist`. Use following command in project root directory.
```shell
$ cp .env.dist .env
```
5. Use empty value for `$DEBUG` environment variable in `starter/.env` file to disable debug output. Debug is enabled by default.
6. Adjust variables values in `.env` file as needed.

## WSL
You MAY need to update current user name, UID, Docker group name and GID mappings in `.env` File. Permissions and access issues are possible otherwise. Try to use defaults first.

## How to get Docker User and Group Environment Variables? 
You may need them to adjust `$HOST_DOCKER_GROUP` and `$HOST_DOCKER_GID` environment variables. Use `$ getent group docker`. If the docker group exists, the command will output information about the group, including its name, group ID, and the usernames of any users that are members of the group. If the docker group does not exist, the command will not produce any output.
```shell
$ getent group docker
docker:x:1001:dev 
```

#### Breakdown
`docker:x:1001:dev` is a single line entry in the `/etc/group` file on a Linux system.

Here's what each field in the entry means:

- `docker`: This is the **name** of the group.
- `x`: This field used to contain an encrypted password for the group, but is no longer used and is typically set to `x`.
- `1001`: This is the **group ID (GID)** of the `docker` group. GIDs are used to uniquely identify groups on a Linux system.
- `dev`: This is a comma-separated list of usernames that are members of the docker group. In this case, the only member of the group is the user `dev`.

Then replace empty values in `.env` with your required ones.

## Run Project
Go down to cloned repository and run
```shell
$ docker compose up
```

## That's It!

Check if all containers are running:
```shell
$ docker ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED             STATUS          PORTS                                                                                            NAMES
f7d404320dee   starter/api:dev        "docker-entrypoint.s…"   41 minutes ago      Up 31 seconds   0.0.0.0:3000->3000/tcp, 0.0.0.0:3443->3443/tcp, 0.0.0.0:9229->9229/tcp                           starter-api-dev
22ca57777403   starter/ui:dev         "docker-entrypoint.s…"   43 minutes ago      Up 30 seconds   0.0.0.0:4000->4000/tcp, 0.0.0.0:4200->4200/tcp, 0.0.0.0:4300->4300/tcp, 0.0.0.0:9222->9222/tcp   starter-ui-dev
5e69999a6aed   starter/redis:7.0.10   "docker-entrypoint.s…"   About an hour ago   Up 32 seconds   0.0.0.0:6379->6379/tcp                                                                           starter-redis
ac0eb591f839   starter/mysql:8.0      "docker-entrypoint.s…"   About an hour ago   Up 31 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp                                                                starter-mysql
70fdb1da25ea   starter/mongo:6.0      "docker-entrypoint.s…"   About an hour ago   Up 32 seconds   0.0.0.0:27017->27017/tcp                                                                         starter-mongo

```

Have fun with dev :-)

If you like starter, please support with small recurring donation at [Patreon](https://www.patreon.com/lehcode) or one-time donation at [Open Collective](https://opencollective.com/nestjs-and-angular-starter)

#### Notes on MongoDB
Connection string to connect to MongoDB instance from host system:

`mongodb://[UsernAme]:[YourPassw0rd]@localhost:[MONGO_PORT]/starter?authMechanism=DEFAULT`

Connection string to connect to MongoDB container from inside any container:

`mongodb://[UsernAme]:[YourPassw0rd]@[MONGO_HOST]:[MONGO_PORT]/starter?authMechanism=DEFAULT`

#### TODO
1. Code linting and testing pipelines for [GitLab](https://docs.gitlab.com/ee/ci/pipelines/).
2. Docker multi-stage build configuration for production.
3. [Locize](https://locize.com/) integration