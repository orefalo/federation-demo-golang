FROM registry.gitlab.com/snapcoreinc/snapcore-monitor:latest as kickstart

FROM golang:1.14-alpine3.12 as builder

ARG CGO_ENABLED=0
ARG GO111MODULE="on"
ARG GOPROXY=""
ARG GOFLAGS=""

ENV CGO_ENABLED=0

RUN addgroup -S app \
    && adduser -S -g app app \
    && apk add --no-cache ca-certificates \
    && mkdir /scratch-tmp

WORKDIR /go/src/handler

COPY . .

RUN CGO_ENABLED=${CGO_ENABLED} GOOS=linux \
    go build --ldflags "-s -w" -a -installsuffix cgo -o handler .

# yuo can start from scratch if your exe use no shared lirbaries
FROM scratch

WORKDIR /

ENV startup_process="/handler"
ENV mode="http"
ENV proxy_url="http://127.0.0.1:8082"
ENV http_proxy=""
ENV https_proxy=""

# Port to the monitor
EXPOSE 8080

# Only when it's a cmd line app
HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

COPY --from=kickstart /tini .
COPY --from=kickstart /dih-monitor /dih-monitor
COPY --from=builder /etc/passwd /etc/group /etc/
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder --chown=app:app /scratch-tmp /tmp
COPY --from=builder /go/src/handler/handler  .

ENTRYPOINT ["/tini", "--"]
CMD ["/dih-monitor"]
