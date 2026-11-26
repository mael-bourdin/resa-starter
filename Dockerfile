FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production

# Dépendances d'abord : tant que package*.json ne change pas,
# Docker réutilise cette couche en cache et ne réinstalle rien.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY src/ ./src/
COPY public/ ./public/

# Ne pas tourner en root
USER node

EXPOSE 3000
CMD ["node", "src/server.js"]
