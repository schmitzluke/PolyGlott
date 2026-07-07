FROM node:20-bookworm-slim AS base

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Generate prisma client before build
RUN npx prisma generate

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy prisma database file if using sqlite (since it's baked in, though we should mount it)
# We will rely on environment variables for DATABASE_URL

# No public folder in this project

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy prisma schema so we can push db in prod if needed
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
