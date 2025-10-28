# ---------- STAGE 1 : BUILD ----------
FROM node:20-alpine AS builder

# Install Chrome + ChromeDriver (headless)
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROMEDRIVER_PATH=/usr/bin/chromedriver

# Install chromedriver (matching Chromium version)
RUN apk add --no-cache chromium-chromedriver

WORKDIR /app

# Copy only package files first (better cache)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY tsconfig.json jest.config.js ./
COPY src ./src

# Compile TS
RUN npm run build


# ---------- STAGE 2 : RUN ----------
FROM node:20-alpine

# Chrome + driver (same as builder)
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      chromium-chromedriver

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROMEDRIVER_PATH=/usr/bin/chromedriver

WORKDIR /app

# Copy only compiled JS + node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/jest.config.js ./

# Run the test (build already done in builder stage)
CMD ["npx", "jest", "--verbose"]
