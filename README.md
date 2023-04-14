# NestJS & Angular Serverless Development Starter Boilerplate


NestJS and Angular starter repository intended for development of a single application. Includes the `docker-compose.yml` file is a configuration file for [Docker Compose](https://docs.docker.com/compose/), a tool for defining and running multi-container Docker applications. The file specifies the services (API, UI, MongoDB, MySQL, Redis) that should be created, and their configurations. 
The system includes both [MongoDB](https://www.mongodb.com/docs/) and [MySQL](https://dev.mysql.com/doc/refman/8.0/en/) Docker services, which are used as databases for the NestJS application. Depending on the needs of the application, either or both of these services can be used.
The [Redis](https://redis.io/docs/about/) service is used as a caching server for the NestJS application, which can improve performance by caching frequently accessed data in memory.
[NestJS](https://docs.nestjs.com/) is a Node.js web framework that is used to build the API service in this system. The pre-configured connections to MongoDB, MySQL, and Redis allow the NestJS application to interact with these services out of the box.
The system includes configuration for [AWS Lambda](https://aws.amazon.com/lambda/) and other cloud services using the serverless framework, which is a popular tool for building and deploying serverless applications.
The system also includes code linting and testing pipelines for [Bitbucket](https://bitbucket.org/product/features/pipelines), which is a web-based hosting service for [Git](https://git-scm.com/about) repositories.    

## What It Does?
1. Downloads all software images `$ docker compose up`.
2. Creates containers for Docker services: API, UI, MongoDB, MySQL, Redis.
3. Mounts `api` and `ui` directories into API and UI containers respectively. From now on while environment is running, all changes on host filesystem in `api` and `ui` directories will be reflected in containers and vice versa. Folders are unmounted when `Ctrl+C` is pressed in terminal running `docker compose`, or `docker compose down` run.
4. Installs all NPM packages with Yarn.
5. Starts both `api` and `ui` Docker services in watch mode, ready for development.

## What It Provides?
#### NestJS
- [i18n](https://www.npmjs.com/package/nestjs-i18n) library and middleware with locale service for working with multiple languages in your nestjs project.
- Authorized administration API endpoints.
- Application configuration service loading config from `.ts` file.
- Application logger service.
- [Mongoose](https://mongoosejs.com/docs/) service.

#### Angular
- [Angular Material](https://material.angular.io/guide/getting-started).
- [Compodoc](https://compodoc.app/) documenting.

## Prerequisites
This is simple, as you only need **Docker** with Docker Compose installed on your system and NodeJS >=16.14. 
Compose should be installed with Docker engine by default. Run `$ docker compose` to see similar output:
```
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
4. Create file `.env` by copying `.env.dist`. Use command `cp .env.dist .env` in project root directory.
5. Do the same with the `docker-assets/mongo/.env.dist` and `docker-assets/mysql/.env.dist`.
6. Use empty value for `$DEBUG` environment variable in `starter/.env` file to disable debug output. Debug is enabled by default.
7. Adjust variables values in `.env` files as needed:
- `.env` - A file with a kind of global environment variables for Docker used at build time
- `docker-assets/mongo/.env` - A file with MongoDB environment variables for Docker used at build time
- `docker-assets/mysql/.env` - A file with MySQL environment variables for Docker used at build time

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
Have fun with dev :-)

If you like starter, please support with small recurring donation at [Patreon](https://www.patreon.com/lehcode) or one-time donation at [Open Collective](https://opencollective.com/nestjs-and-angular-starter)

#### Notes on MongoDB
Connection string to connect to MongoDB instance from host system:

`mongodb://[Your_Username]:[YourPassw0rd]@localhost:[MONGO_PORT]/?authMechanism=DEFAULT`

Connection string to connect to MongoDB container from inside any container:

`mongodb://[Your_Username]:[YourPassw0rd]@mongo-db:[MONGO_PORT]/?authMechanism=DEFAULT`

#### TODO
1. Code linting and testing pipelines for [GitLab](https://docs.gitlab.com/ee/ci/pipelines/).
2. Docker multi-stage build configuration for production.