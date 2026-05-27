FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY package*.json ./
COPY pnpm-workspace.yaml ./

RUN pnpm install --ignore-scripts
RUN pnpm approve-builds --yes

COPY . .    
RUN pnpm run build
RUN npx prisma generate

FROM node:22-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./

RUN pnpm install --ignore-scripts
RUN pnpm approve-builds --yes

COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/src/main"]
