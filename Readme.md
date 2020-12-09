## Apollo Federation Demo

A side/side comparison of golang's gqlgen vs apollo federation capabilities highlighting issues with the golang implementation

## Setup

go get github.com/99designs/gqlgen

### Golang version

```
make build_golang
make start_golang
```

### Typescript version

```
cd service_ts
npm install -g @microsoft/rush
npm build
npm run server
open browser to http://127.0.0.1:8082/
```
