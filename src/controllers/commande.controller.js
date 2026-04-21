/**
 * Contrôleur pour les Commandes
 * Gère les requêtes HTTP liées aux commandes
 * Fait le lien entre les routes et le service
 */

import commandeService from '../services/commande.service.js';
import { successResponse, createdResponse } from '../utils/response.utils.js';

/**
 * Contrôleur Commandes - Gestion des requêtes HTTP pour les commandes
 */
export const commandeController = {
  /**
   * Récupérer toutes les commandes
   * GET /api/commandes
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next pour passer l'erreur au middleware
   */
  async getAll(req, res, next) {
    try {
      const commandes = await commandeService.getAll();
      return successResponse(res, commandes, 'Commandes récupérées avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer une commande par ID
   * GET /api/commandes/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const commande = await commandeService.getById(id);
      return successResponse(res, commande, 'Commande récupérée avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Créer une nouvelle commande
   * POST /api/commandes
   * @param {Object} req - Requête Express avec les données dans le body
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async create(req, res, next) {
    try {
      const commande = await commandeService.create(req.body);
      return createdResponse(res, commande, 'Commande créée avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Mettre à jour le statut d'une commande
   * PATCH /api/commandes/:id/statut
   * @param {Object} req - Requête Express avec id et nouveau statut
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async updateStatut(req, res, next) {
    try {
      const { id } = req.params;
      const { statut } = req.body;
      const commande = await commandeService.updateStatut(id, statut);
      return successResponse(res, commande, 'Statut de la commande mis à jour');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Supprimer une commande
   * DELETE /api/commandes/:id
   * @param {Object} req - Requête Express avec paramètre id
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await commandeService.delete(id);
      return successResponse(res, null, 'Commande supprimée avec succès');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer les commandes d'une table
   * GET /api/commandes/table/:tableId
   * @param {Object} req - Requête Express avec paramètre tableId
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getByTableId(req, res, next) {
    try {
      const { tableId } = req.params;
      const commandes = await commandeService.getByTableId(tableId);
      return successResponse(res, commandes, 'Commandes de la table récupérées');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Récupérer les commandes d'un serveur
   * GET /api/commandes/serveur/:serveurId
   * @param {Object} req - Requête Express avec paramètre serveurId
   * @param {Object} res - Réponse Express
   * @param {Function} next - Fonction next
   */
  async getByServeurId(req, res, next) {
    try {
      const { serveurId } = req.params;
      const commandes = await commandeService.getByServeurId(serveurId);
      return successResponse(res, commandes, 'Commandes du serveur récupérées');
    } catch (error) {
      next(error);
    }
  },
};

export default commandeController;
