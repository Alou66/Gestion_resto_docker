/**
 * Contrôleur pour les Plats
 * Gère les requêtes HTTP liées aux plats
 * Fait le lien entre les routes et le service
 */

import platService from '../services/plat.service.js';
import { successResponse, createdResponse } from '../utils/response.utils.js';

/**
 * Contrôleur Plats - Gestion des requêtes HTTP pour les plats
 */
export const platController = {
  /**
   * Récupérer tous les plats
   * GET /api/plats
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next pour passer l'erreur au middleware
   */
  async getAll(req, res, next) {
    try {
      const plats = await platService.getAll();
      return successResponse(res, plats, 'Plats récupérés avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer un plat par ID
   * GET /api/plats/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const plat = await platService.getById(id);
      return successResponse(res, plat, 'Plat récupéré avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Créer un nouveau plat
   * POST /api/plats
   * @param {Object} req - Requête Express avec les données dans le body
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async create(req, res, next) {
    try {
      const plat = await platService.create(req.body);
      return createdResponse(res, plat, 'Plat créé avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Mettre à jour un plat
   * PUT /api/plats/:id
   * @param {Object} req - Requête Express avec id et données à mettre à jour
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const plat = await platService.update(id, req.body);
      return successResponse(res, plat, 'Plat mis à jour avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Supprimer un plat
   * DELETE /api/plats/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await platService.delete(id);
      return successResponse(res, null, 'Plat supprimé avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer les plats par catégorie
   * GET /api/plats/categorie/:categorie
   * @param {Object} req - Requête Express avec paramètre categorie
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getByCategorie(req, res, next) {
    try {
      const { categorie } = req.params;
      const plats = await platService.getByCategorie(categorie.toUpperCase());
      return successResponse(res, plats, 'Plats récupérés par catégorie');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer les plats disponibles
   * GET /api/plats/disponibles
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getDisponibles(req, res, next) {
    try {
      const plats = await platService.getDisponibles();
      return successResponse(res, plats, 'Plats disponibles récupérés');
    } catch (error) {
      next(error);
    }
  },
};

export default platController;
