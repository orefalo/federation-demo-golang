FROM registry.gitlab.com/snapcoreinc/snapcore-monitor:latest as kickstart
FROM registry.gitlab.com/snapcoreinc/snapcore-nodejs:latest as nodejs

FROM node:14.7.0-alpine3.12 as builder

RUN addgroup -S app \
    && adduser -S -g app app \
    && apk add --no-cache ca-certificates \
    && mkdir /scratch-tmp \
    && npm i -g typescript

WORKDIR /handler

COPY . .
RUN npm i
RUN tsc
RUN npm prune --production

# yuo can start from scratch if your exe use no shared lirbaries
FROM scratch

COPY --from=builder /handler /handler

# Only when it's a cmd line app
#HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

COPY --from=nodejs /node /
COPY --from=kickstart /tini /
COPY --from=kickstart /dih-monitor /
COPY --from=builder /etc/passwd /etc/group /etc/
# COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder --chown=app:app /scratch-tmp /tmp

WORKDIR /handler

ENV startup_process="/node index.js"
ENV mode="http"
ENV proxy_url="http://127.0.0.1:8082"
ENV http_proxy=""
ENV https_proxy=""

# Port to the monitor
EXPOSE 8080

ENTRYPOINT ["/tini", "--"]
CMD ["/dih-monitor"]
