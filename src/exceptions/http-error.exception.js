/**
 * Exceptions HTTP personnalisées
 * Suite de classes d'erreurs pour gérer les différents types d'erreurs HTTP
 * Suit le principe SRP (Single Responsibility Principle) - une classe par type d'erreur
 */

/**
 * Classe de base pour toutes les erreurs HTTP
 * Hérite de Error pour maintenir la compatibilité avec le système d'erreur JavaScript
 */
export class HttpError extends Error {
  /**
   * Constructeur de l'erreur HTTP
   * @param {number} statusCode - Code de statut HTTP
   * @param {string} message - Message d'erreur
   * @param {Array} errors - Tableau d'erreurs détaillées (optionnel)
   */
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Erreur 404 - Ressource non trouvée
 */
export class NotFoundError extends HttpError {
  constructor(message = 'Ressource non trouvée') {
    super(404, message);
  }
}

/**
 * Erreur 400 - Erreur de validation des données
 */
export class ValidationError extends HttpError {
  constructor(message = 'Données invalides', errors = null) {
    super(400, message, errors);
  }
}

/**
 * Erreur 409 - Conflit de données (doublon, violation de contrainte)
 */
export class ConflictError extends HttpError {
  constructor(message = 'Conflit de données') {
    super(409, message);
  }
}

/**
 * Erreur 403 - Accès refusé
 */
export class ForbiddenError extends HttpError {
  constructor(message = 'Accès refusé') {
    super(403, message);
  }
}

/**
 * Erreur 500 - Erreur interne du serveur
 */
export class InternalServerError extends HttpError {
  constructor(message = 'Erreur interne du serveur') {
    super(500, message);
  }
}
