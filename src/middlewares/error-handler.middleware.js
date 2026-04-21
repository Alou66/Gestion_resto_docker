/**
 * Middleware de gestion des erreurs
 * Intercepte toutes les erreurs et retourne une réponse JSON appropriée
 */

import { HttpError } from '../exceptions/http-error.exception.js';
import { errorResponse } from '../utils/response.utils.js';

export const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Erreur:', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  if (err instanceof HttpError) {
    const response = { success: false, message: err.message };
    if (err.errors) {
      response.errors = err.errors;
    }
    return res.status(err.statusCode).json(response);
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    return errorResponse(res, 'Erreur de base de données', 500);
  }

  if (err.name === 'PrismaClientValidationError') {
    return errorResponse(res, 'Données invalides pour la base de données', 400);
  }

  return errorResponse(
    res,
    process.env.NODE_ENV === 'development' ? err.message : 'Erreur interne du serveur',
    500
  );
};
