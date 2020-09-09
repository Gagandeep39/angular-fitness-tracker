FROM nginx:alpine
COPY /dist/angular-fitness-tracker /usr/share/nginx/html
EXPOSE 80