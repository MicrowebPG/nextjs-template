# Stage 1: Builder
FROM node:24-alpine AS builder
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-fund --no-audit

COPY . .
ENV NODE_ENV=production
RUN npm run build && \
    curl -sf https://gobinaries.com/tj/node-prune | sh && \
    node-prune .next/standalone/node_modules


# Stage 2: Runtime (distroless)
FROM gcr.io/distroless/nodejs24-debian12:nonroot
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Copy optimized build output
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static
COPY --from=builder --chown=nonroot:nonroot /app/public ./public

USER nonroot
EXPOSE 3000

CMD ["server.js"]
