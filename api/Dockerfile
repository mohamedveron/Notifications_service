FROM node:10.15-alpine

ENV HOST=0.0.0.0

# Update alpine packages and add yarn
RUN apk update add --no-cache yarn

# Add adonis-cli
RUN yarn global add @adonisjs/cli pm2  && \
  mkdir /api

COPY . /api

# Enter api dir
WORKDIR /api

# Create empty .env file
RUN touch .env && \
    yarn install


# Start server
CMD adonis migration:run --force && \
    pm2-runtime start ecosystem.config.js
