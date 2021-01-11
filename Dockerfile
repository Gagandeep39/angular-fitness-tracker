# If build is already created
FROM nginx:alpine
COPY /dist/angular-fitness-tracker /usr/share/nginx/html
EXPOSE 80
# *****************
# Fix the Blnk page issue by creating production build using 
# ng build --prod --base-href="/"
# Instead of
# ng build --prod --base-href="/angular-fitness-tracker/"

# If build is required to be created during docker build
# FROM node:12.16.1-alpine As builder
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build --prod
# FROM nginx:alpine
# COPY --from=builder /usr/src/app/dist/angular-fitness-tracker /usr/share/nginx/html
# EXPOSE 80