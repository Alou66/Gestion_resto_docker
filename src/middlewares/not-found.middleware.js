/**
 * Middleware pour les routes non trouvées (404)
 * Intercepte les requêtes vers des routes inexistantes
 */

import { NotFoundError } from '../exceptions/http-error.exception.js';

/**
 * Gestionnaire de routes non trouvées
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next Express
 */
export const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} non trouvée`);
  next(error);
};
