/**
 * Service pour les Commandes
 * Logique métier pour la gestion des commandes du restaurant
 * 
 * Règles de gestion:
 * - Une commande nécessite une table, un serveur et un plat existants
 * - Le plat doit être DISPONIBLE
 * - La quantité doit être un entier > 0
 * - La date de commande est générée automatiquement
 * - Le montant total est calculé: quantité × prix du plat
 * - Statut initial: EN_COURS
 * - Un serveur ne peut avoir qu'une seule commande EN_COURS à la fois
 * - Interdire suppression si la commande est EN_COURS
 */

import commandeRepository from '../repositories/commande.repository.js';
import serveurRepository from '../repositories/serveur.repository.js';
import tableService from './table.service.js';
import serveurService from './serveur.service.js';
import platService from './plat.service.js';
import { NotFoundError, ConflictError } from '../exceptions/http-error.exception.js';

export const commandeService = {
  async getAll() {
    return commandeRepository.findAll();
  },

  async getById(id) {
    const commande = await commandeRepository.findById(id);
    if (!commande) {
      throw new NotFoundError(`Commande avec ID ${id} non trouvée`);
    }
    return commande;
  },

  async create(data) {
    // 1. Vérifier existence de la table
    await tableService.getById(data.tableId);

    // 2. Vérifier existence du serveur
    await serveurService.getById(data.serveurId);

    // 3. Vérifier que le serveur n'a pas déjà une commande EN_COURS (règle métier)
    const hasCommandeEnCours = await serveurRepository.hasCommandeEnCours(data.serveurId);
    if (hasCommandeEnCours) {
      throw new ConflictError('Le serveur a déjà une commande en cours. Veuillez attendre qu\'elle soit servie.');
    }

    // 4. Vérifier existence et disponibilité du plat
    const plat = await platService.verifierDisponibilite(data.platId);

    // 5. Calculer le montant total: quantité × prix du plat
    const montantTotal = Number(data.quantite) * Number(plat.prix);

    // 6. Créer la commande avec la date automatique et le statut initial EN_COURS
    return commandeRepository.create({
      tableId: data.tableId,
      serveurId: data.serveurId,
      platId: data.platId,
      quantite: data.quantite,
      montantTotal,
      dateCommande: new Date(), // Date automatique
      statut: 'EN_COURS',
    });
  },

  async updateStatut(id, statut) {
    await this.getById(id);
    return commandeRepository.updateStatut(id, statut);
  },

  async delete(id) {
    const commande = await this.getById(id);

    if (commande.statut === 'EN_COURS') {
      throw new ConflictError('Impossible de supprimer une commande en cours');
    }

    return commandeRepository.delete(id);
  },

  async getByTableId(tableId) {
    return commandeRepository.findByTableId(tableId);
  },

  async getByServeurId(serveurId) {
    return commandeRepository.findByServeurId(serveurId);
  },
};

export default commandeService;
