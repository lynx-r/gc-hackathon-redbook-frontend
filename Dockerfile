#STAGE 1
FROM node:18-alpine as build
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /opt/app/dist/redbook-frontend/browser /usr/share/nginx/html