# Create Builder
FROM node:alpine as builder
MAINTAINER Geunta Buwono
LABEL version="0.0.1"
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install -s --frozen-lockfile
COPY . .
RUN yarn client gulp build --env staging

# Serve Client on NGINX
FROM nginx:stable
COPY --from=builder /app/packages/client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
