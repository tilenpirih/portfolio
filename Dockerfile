# Use Node.js base image
FROM node:24.6.0-alpine AS base

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

FROM base AS build

ENV NODE_ENV=production

COPY . /usr/src/app

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Build the app
RUN pnpm run build

FROM base AS app

COPY --from=build /usr/src/app/.output /prod/app
WORKDIR /prod/app

EXPOSE 3000

CMD ["node", "server/index.mjs"]