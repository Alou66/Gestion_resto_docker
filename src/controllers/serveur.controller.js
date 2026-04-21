/**
 * Contrôleur pour les Serveurs
 * Gère les requêtes HTTP liées aux serveurs
 * Fait le lien entre les routes et le service
 */

import serveurService from '../services/serveur.service.js';
import { successResponse, createdResponse } from '../utils/response.utils.js';

/**
 * Contrôleur Serveurs - Gestion des requêtes HTTP pour les serveurs
 */
export const serveurController = {
  /**
   * Récupérer tous les serveurs
   * GET /api/serveurs
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next pour passer l'erreur au middleware
   */
  async getAll(req, res, next) {
    try {
      const serveurs = await serveurService.getAll();
      return successResponse(res, serveurs, 'Serveurs récupérés avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer un serveur par ID
   * GET /api/serveurs/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const serveur = await serveurService.getById(id);
      return successResponse(res, serveur, 'Serveur récupéré avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Créer un nouveau serveur
   * POST /api/serveurs
   * @param {Object} req - Requête Express avec les données dans le body
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async create(req, res, next) {
    try {
      const serveur = await serveurService.create(req.body);
      return createdResponse(res, serveur, 'Serveur créé avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Mettre à jour un serveur
   * PUT /api/serveurs/:id
   * @param {Object} req - Requête Express avec id et données à mettre à jour
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const serveur = await serveurService.update(id, req.body);
      return successResponse(res, serveur, 'Serveur mis à jour avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Supprimer un serveur
   * DELETE /api/serveurs/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await serveurService.delete(id);
      return successResponse(res, null, 'Serveur supprimé avec succès');
    } catch (error) {
      next(error);
    }
  },
};

export default serveurController;
