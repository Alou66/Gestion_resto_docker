/**
 * Point d'entrée du serveur
 * Démarre le serveur HTTP
 */
import app from './app.js';
import { config } from './config/env.js';

/**
 * Démarrage du serveur
 */
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`📋  API disponible sur http://localhost:${PORT}`);
  console.log(`📋  Documentation sur http://localhost:${PORT}/api-docs`);
});






