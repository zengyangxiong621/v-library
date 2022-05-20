# --- base images -------------
FROM  docker.gridsumdissector.com/library/node:14.16.0  AS base
# --- run images -----------
FROM docker.gridsumdissector.com/library/nginx:1.20.1 AS run

# --- dependencies images -------------
FROM base AS dependencies

RUN npm config set registry https://registry.npm.taobao.org
WORKDIR /workdir
ADD ./ /workdir

RUN npm install
RUN npm run build


FROM run AS release

COPY --from=dependencies --chown=nginx  /workdir/build  /usr/share/nginx/html

EXPOSE 8080

