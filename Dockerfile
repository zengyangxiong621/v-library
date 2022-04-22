# --- base images -------------
FROM repository.gridsum.com:8443/techpub/node:latest  AS base
# --- run images -----------
FROM repository.gridsum.com:8443/techpub/nginx:latest AS run

# --- dependencies images -------------
FROM base AS dependencies

RUN npm config set registry http://registry.npm.gridsum.com/
RUN npm config set sass-binary-site "https://npm.taobao.org/mirrors/node-sass/"
WORKDIR /workdir
ADD ./ /workdir

RUN npm install  --registry=http://registry.npm.gridsum.com
RUN npm run build


FROM run AS release

COPY --from=dependencies --chown=nginx  /workdir/dist  /usr/html/

EXPOSE 8080
