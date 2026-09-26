FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install --frozen -lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm build

EXPOSE 5000

CMD ["pnpm", "start"]