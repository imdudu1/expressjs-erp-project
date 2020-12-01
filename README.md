# 🏭 기업 ERP 프로젝트 (Back-end)
#### Front-end 작업물은 [이곳](https://github.com/aid95/expressjs-erp-project-frontend)에서 확인할 수 있습니다.

## 사용 기술

- Graphql-yoga (include Express.js)
- Prisma v1

## 실행 환경

- Docker
- Node.js

## 프로젝트 실행

```.env```은 루트 디렉토리에 위치합니다.
```shell
PORT=4000
JWT_SECRET="veryverysimpleexample"
```

프로젝트 실행은 아래의 명령어를 수행합니다.
```shell
# docker-compose up -d 
docker-compose start
yarn install
yarn prisma

# RUN SERVER
yarn run dev
```
