/**
 * Application Express principale
 * Configure le serveur, les middlewares et les routes
 */
import express from 'express';
import cors from 'cors';

// Importations des routes
import tableRoutes from './routes/table.routes.js';
import serveurRoutes from './routes/serveur.routes.js';
import platRoutes from './routes/plat.routes.js';
import commandeRoutes from './routes/commande.routes.js';

// Importations des middlewares
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';

// Import Swagger (optionnel)
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

/**
 * Création de l'application Express
 */
const app = express();

// Middlewares globaux
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'API Restaurant RESTO 221',
    version: '1.0.0',
    endpoints: {
      tables: '/api/tables',
      serveurs: '/api/serveurs',
      plats: '/api/plats',
      commandes: '/api/commandes',
    },
    Documentation: '/api-docs',
  });
});

// Route Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes API avec préfixe /api
app.use('/api/tables', tableRoutes);
app.use('/api/serveurs', serveurRoutes);
app.use('/api/plats', platRoutes);
app.use('/api/commandes', commandeRoutes);

// Middlewares de gestion des erreurs (doivent être en dernier)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
