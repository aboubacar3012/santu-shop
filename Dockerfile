# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Installation de pnpm (version alignée avec le lockfile pour éviter ERR_PNPM_LOCKFILE_BREAKING_CHANGE)
RUN npm install -g pnpm@10.28.1

# Configurer pnpm pour utiliser un store dans /app
RUN pnpm config set store-dir /app/.pnpm-store

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances (y compris devDependencies pour Prisma)
# --no-frozen-lockfile : le lockfile peut être incompatible (version pnpm, overrides) ; pnpm le met à jour
RUN pnpm install --no-frozen-lockfile

# Copier le reste des fichiers (prisma, prisma.config.ts, .env, src, etc.)
COPY . .

# Build : prisma generate && next build (cf. package.json) — prisma.config et .env sont présents
RUN pnpm run build

# Stage 2: Production (mode standalone)
FROM node:22-alpine AS runner

WORKDIR /app

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier le dossier standalone depuis le builder
# Le mode standalone contient uniquement les fichiers nécessaires pour l'exécution
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copier les assets statiques (nécessaires pour le rendu côté client)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copier le dossier public (assets publics)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copier le schéma Prisma (utile pour les migrations si nécessaire)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Copier le fichier .env (peut être surchargé par les variables d'environnement Docker au runtime)
COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env

# Copier le contenu markdown (cours/labs/learning)
# En mode standalone, Next.js ne copie pas automatiquement `src/` dans `.next/standalone`.
# Or l'API `/api/markdown` lit les fichiers via `process.cwd()/src/app/...`
COPY --from=builder --chown=nextjs:nodejs /app/src/app/academy ./src/app/academy

USER nextjs

# Exposer le port 3000
EXPOSE 3000

# Variables d'environnement
ENV PORT=3000
ENV NODE_ENV=production

# Commande de démarrage avec le serveur standalone
# Le dossier standalone contient déjà un server.js à la racine
CMD ["node", "server.js"]

# Commandes utiles :
# docker build -t santu-academy:latest .
# docker run -p 3000:3000 santu-academy:latest
