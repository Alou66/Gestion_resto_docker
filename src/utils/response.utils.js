/**
 * Utilitaires pour les réponses HTTP
 * Fonctions utilitaires pour formater les réponses de l'API de manière cohérente
 */

/**
 * Réponse de succès
 * @param {Object} res - Objet Response Express
 * @param {*} data - Données à retourner
 * @param {string} message - Message de succès
 * @param {number} statusCode - Code de statut HTTP
 * @returns {Object} Réponse JSON formatée
 */
export const successResponse = (res, data, message = 'Succès', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Réponse de succès pour une création (201)
 * @param {Object} res - Objet Response Express
 * @param {*} data - Données à retourner
 * @param {string} message - Message de succès
 * @returns {Object} Réponse JSON formatée
 */
export const createdResponse = (res, data, message = 'Ressource créée avec succès') => {
  return successResponse(res, data, message, 201);
};

/**
 * Réponse d'erreur
 * @param {Object} res - Objet Response Express
 * @param {string} message - Message d'erreur
 * @param {number} statusCode - Code de statut HTTP
 * @returns {Object} Réponse JSON formatée
 */
export const errorResponse = (res, message = 'Erreur serveur', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Réponse avec pagination
 * @param {Object} res - Objet Response Express
 * @param {Array} data - Données à retourner
 * @param {number} total - Total des enregistrements
 * @param {number} page - Page courante
 * @param {number} limit - Limite par page
 * @returns {Object} Réponse JSON formatée avec métadonnées de pagination
 */
export const paginatedResponse = (res, data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
};
