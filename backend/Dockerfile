FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production

COPY . .

RUN bun run build

FROM oven/bun:1-alpine

WORKDIR /app

ENV PORT=3000
ENV NODE_ENV=production
ENV FRONTEND_URL='https://mbtictactoeonline.netlify.app'

COPY --from=builder /app/dist ./

EXPOSE 3000

CMD ["bun", "index.js"]