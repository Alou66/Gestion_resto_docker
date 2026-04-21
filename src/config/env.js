/**
 * Configuration des variables d'environnement
 * Charge les variables depuis le fichier .env
 */
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration de l'application
 */
export const config = {
  /** Port du serveur */
  PORT: process.env.PORT || 3000,
  
  /** URL de la base de données PostgreSQL */
  DATABASE_URL: process.env.DATABASE_URL,
  
  /** Environnement de fonctionnement */
  NODE_ENV: process.env.NODE_ENV || 'development',
};
