
# NestJS Bookmarks API
### Features

 - [x] User Auth with Jwt
 - [x] Protected routes for CRUD operations
 - [x] Users can save favourite links with custom title and desc
 - [x] Personalized, can edit,  add and delete saved links and user profile
 - [x] Dockerized 
 - [x] e2e, integration tests with Jest, nestjs testing and Pactum
 
 ### Tech Stack
 
  - Typescript
 - Nest.js
 - PostgreSQL
 - ORM: Prisma
 - Pactum, Jest for Testing
 - Docker

### How to run
**prerequisites:** Nestjs, docker, postgres on your machine.
stop all the pre running docker images in the bg.
`docker image rm imageIds`
or clean them all with
```bash
docker container rm -f $(docker container ls -q)
```
```bash
docker image rm -f $(docker image ls -q)
```
- start postgres image in docker
```bash
npm run db:dev:up
```
-  run initial migrations 
```bash
npm run prisma:dev:deploy
```
- restart the whole process
```bash
npm run db:dev:restart
```

**running tests:** stop the dev-db docker image  with `npm run db:dev:rm`
run `npm run db:test:restart`   and  `npm run test:e2e`



### Project file structure

```
─ prisma // ORM with Postgres 
  ├── migrations
  │   ├── MigrationFolder
  │   │   └── migration.sql
  └── schema.prisma
─ src
  ├── app.module.ts
  ├── auth
  │   ├── auth.controller.ts
  │   ├── auth.module.ts
  │   ├── auth.service.ts
  │   ├── decorator
  │   │   ├── get-user.decorator.ts
  │   │   └── index.ts
  │   ├── dto
  │   │   ├── auth.dto.ts
  │   │   └── index.ts
  │   ├── guard
  │   │   ├── index.ts
  │   │   └── jwt.guard.ts
  │   └── strategy
  │       ├── index.ts
  │       └── jwt.strategy.ts
  ├── bookmark // crud service
  │   ├── bookmark.controller.ts
  │   ├── bookmark.module.ts
  │   ├── bookmark.service.ts
  │   └── dto
  │       ├── create-bookmark.dto.ts
  │       ├── edit-bookmark.dto.ts
  │       └── index.ts
  ├── main.ts
  ├── prisma
  │   ├── prisma.module.ts
  │   └── prisma.service.ts
  └── user // crud service
      ├── dto
      │   ├── edit-user.dto.ts
      │   └── index.ts
      ├── user.controller.ts
      ├── user.module.ts
      └── user.service.ts
─ test 
  ├── app.e2e-spec.ts
  └── jest-e2e.json
─ docker-compose.yml
─ nest-cli.json
─ package.json
─ tsconfig.build.json
─ tsconfig.json
─ README.md
```
