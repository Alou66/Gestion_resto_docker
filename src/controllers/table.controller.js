/**
 * Contrôleur pour les Tables
 * Gère les requêtes HTTP liées aux tables
 * Fait le lien entre les routes et le service
 */

import tableService from '../services/table.service.js';
import { successResponse, createdResponse, errorResponse } from '../utils/response.utils.js';

/**
 * Contrôleur Tables - Gestion des requêtes HTTP pour les tables
 */
export const tableController = {
  /**
   * Récupérer toutes les tables
   * GET /api/tables
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next pour passer l'erreur au middleware
   */
  async getAll(req, res, next) {
    try {
      const tables = await tableService.getAll();
      return successResponse(res, tables, 'Tables récupérées avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer une table par ID
   * GET /api/tables/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const table = await tableService.getById(id);
      return successResponse(res, table, 'Table récupérée avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Créer une nouvelle table
   * POST /api/tables
   * @param {Object} req - Requête Express avec les données dans le body
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async create(req, res, next) {
    try {
      const table = await tableService.create(req.body);
      return createdResponse(res, table, 'Table créée avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Mettre à jour une table
   * PUT /api/tables/:id
   * @param {Object} req - Requête Express avec id et données à mettre à jour
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const table = await tableService.update(id, req.body);
      return successResponse(res, table, 'Table mise à jour avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Supprimer une table
   * DELETE /api/tables/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await tableService.delete(id);
      return successResponse(res, null, 'Table supprimée avec succès');
    } catch (error) {
      next(error);
    }
  },
};

export default tableController;
