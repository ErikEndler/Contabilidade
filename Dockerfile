FROM node:14-alpine as build

WORKDIR /

COPY . .

ENV NODE_ENV=production
RUN npm install --production
RUN npm run build

FROM nginx:1.20.0-alpine as final

WORKDIR /
COPY --from=build ./dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d