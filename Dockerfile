# Stage 1: Builder
FROM node:24-alpine AS builder
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-fund --no-audit

COPY . .

# Check that output: 'standalone' is enabled (not commented)
RUN grep -E "^\s*output:" next.config.ts | grep -q "standalone" || (echo "ERROR: next.config.ts must have output: 'standalone' enabled" && exit 1)

# Ensure public directory exists (required for COPY in runtime stage)
RUN mkdir -p public

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
