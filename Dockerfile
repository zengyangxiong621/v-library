# --- base images -------------
FROM  docker.gridsumdissector.com/library/node:14.16.0  AS base
# --- run images -----------
# FROM  docker.gridsumdissector.com/library/v-libray/nginx:latest AS run

# --- dependencies images -------------
FROM base AS dependencies

# RUN npm config set registry http://registry.npm.gridsum.com/
WORKDIR /workdir
ADD ./ /workdir

RUN yarn
RUN yarn build


FROM run AS release

COPY --from=dependencies --chown=nginx  /workdir/dist  /usr/html/

EXPOSE 8080
