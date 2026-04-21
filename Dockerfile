FROM node:20

WORKDIR /app

# Copier seulement les fichiers nécessaires pour le cache
COPY package*.json ./

RUN npm ci

# Copier le reste du projet
COPY . .

# Génération Prisma (important après copie)
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]