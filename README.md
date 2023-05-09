# NestJS & Angular Development Starter Boilerplate

This NestJS and Angular starter boilerplate is designed to help you quickly set up a single application for development
using Docker Compose, MongoDB, MySQL, Redis, and AWS Lambda. The boilerplate includes configuration for code linting
and testing pipelines for Bitbucket. Whether you deploy to containers or not, containers make a great development environment because you can:

- Develop with a consistent, easily reproducible toolchain on the same operating system you deploy to.
- Quickly swap between different, separate development environments and safely make updates without worrying about impacting your local machine.
- Make it easy for new team members / contributors to get up and running in a consistent development environment.
- Try out new technologies or clone a copy of a code base without impacting your local setup.

**NOTICE: Starter is supposed to use in development, testing or staging environments. DO NOT use it for production even if the effort was made to use the best security practices.**

Includes the `docker-compose.yml` file, the configuration file for [Docker Compose](https://docs.docker.com/compose/),
a tool for defining and running multi-container Docker applications. The file specifies the Docker services (`API`, `UI`, `MongoDB`,
`MySQL`, `Redis`) that should be created, and their configurations.

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
2. Creates containers for Docker services: `api`, `ui`, `mongo`, `mysql`, `redis`.
3. Set unified timezone across all containers, Etc/UTC by default.
4. Mounts `api` and `ui` directories into API and UI containers respectively. From now on while environment is running, all changes on host filesystem in `api` and `ui` directories will be reflected in containers and vice versa. Folders are unmounted from container when `Ctrl+C` is pressed in terminal running `docker compose`, or `docker compose down` run.
5. Installs all NPM packages with Yarn.
6. Starts both `api` and `ui` Docker services in watch mode, with backends, completely ready for development.

## What It Provides?

### NestJS

- Application configuration service loads config from `.ts` file which in turn utilizes environment variables to configure application.
- [i18next](https://www.i18next.com/overview/getting-started) library and locale middleware with locale service to use multiple languages in your NestJS project.
- Authorized administration API endpoints with [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) password encryption.
- Pre-configured Mongo database service using [Mongoose](https://mongoosejs.com/docs/).
- `mongosh` to manually connect to MongoDB from container if needed, and debug queries using command line.
- Pre-configured MySQL service utilizes [@nestjs/typeorm](https://docs.nestjs.com/techniques/database).
- AWS Lambda configuration environment variables included in `.env` file.
- Application logger service.

### Angular

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
4. Create file `starter/.env` by copying `starter/.env.dist`. Use following command in project root directory `cp .env.dist .env`.
5. Use empty value for `$DEBUG` environment variable in `starter/.env` file to disable debug output. Debug is enabled by default.
6. Adjust variables values in `.env` file as needed.

## WSL

You MAY need to update current user name, UID, Docker group name and GID mappings in `.env` File. Permissions and access issues are possible otherwise; it is advised to use defaults first though.

### How to get Docker User and Group Environment Variables?

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

You can run all services at once with `docker compose up`.

Altenatively you can start **NestJS API service** with DB's and cache with `docker compose up api`. This will start API service with MongoDb and MySQL backends, and Redis caching server.

To start **Angular UI service** just use `docker compose up ui`.

## That's It

Check if required containers are started (all in my case):

```shell
$ docker ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED             STATUS          PORTS                                                                                            NAMES
f7d404320dee   starter/api:dev        "docker-entrypoint.s…"   41 minutes ago      Up 31 seconds   0.0.0.0:3000->3000/tcp, 0.0.0.0:3443->3443/tcp, 0.0.0.0:9229->9229/tcp                           starter-api-dev
22ca57777403   starter/ui:dev         "docker-entrypoint.s…"   43 minutes ago      Up 30 seconds   0.0.0.0:4000->4000/tcp, 0.0.0.0:4200->4200/tcp, 0.0.0.0:4300->4300/tcp, 0.0.0.0:9222->9222/tcp   starter-ui-dev
5e69999a6aed   starter/redis:7.0.10   "docker-entrypoint.s…"   About an hour ago   Up 32 seconds   0.0.0.0:6379->6379/tcp                                                                           starter-redis
ac0eb591f839   starter/mysql:8.0      "docker-entrypoint.s…"   About an hour ago   Up 31 seconds   0.0.0.0:3306->3306/tcp, 3306/tcp                                                                starter-mysql
70fdb1da25ea   starter/mongo:6.0      "docker-entrypoint.s…"   About an hour ago   Up 32 seconds   0.0.0.0:27017->27017/tcp                                                                         starter-mongo

```

Have fun with dev :-)

If you like starter, please support with small recurring donation at [Patreon](https://www.patreon.com/lehcode) or one-time donation at [Open Collective](https://opencollective.com/nestjs-and-angular-starter)

### Notes on MongoDB

Connection string to connect to MongoDB instance from host system:

`mongodb://[Your_Username]:[YourPassw0rd]@localhost:[MONGO_PORT]/?authMechanism=DEFAULT`

Connection string to connect to MongoDB container from inside any container:

`mongodb://[Your_Username]:[YourPassw0rd]@mongo-db:[MONGO_PORT]/?authMechanism=DEFAULT`

### TODO

1. Code linting and testing pipelines for [GitLab](https://docs.gitlab.com/ee/ci/pipelines/).
2. Docker multi-stage build configuration for production.
3. [Locize](https://locize.com/) integration
