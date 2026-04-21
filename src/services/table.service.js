/**
 * Service pour les Tables
 * Logique métier pour la gestion des tables du restaurant
 * 
 * Règles de gestion:
 * - Le numéro de table doit être unique
 * - La capacité doit être un entier > 0
 * - L'emplacement est obligatoire (TERRASSE, INTERIEUR, VIP)
 * - Interdire modification/suppression si des commandes EN_COURS existent
 */

import tableRepository from '../repositories/table.repository.js';
import { NotFoundError, ConflictError } from '../exceptions/http-error.exception.js';

export const tableService = {
  async getAll() {
    return tableRepository.findAll();
  },

  async getById(id) {
    const table = await tableRepository.findById(id);
    if (!table) {
      throw new NotFoundError(`Table avec ID ${id} non trouvée`);
    }
    return table;
  },

  async create(data) {
    const existingTable = await tableRepository.findByNumero(data.numero);
    if (existingTable) {
      throw new ConflictError(`Le numéro de table ${data.numero} existe déjà`);
    }
    return tableRepository.create(data);
  },

  async update(id, data) {
    await this.getById(id);

    // Vérifier qu'aucune commande EN_COURS n'existe
    const commandesEnCours = await tableRepository.countCommandesEnCours(id);
    if (commandesEnCours > 0) {
      throw new ConflictError(
        `Impossible de modifier la table: ${commandesEnCours} commande(s) en cours`
      );
    }

    // Si mise à jour du numéro, vérifier l'unicité
    if (data.numero) {
      const existingTable = await tableRepository.findByNumero(data.numero);
      if (existingTable && existingTable.id !== id) {
        throw new ConflictError(`Le numéro de table ${data.numero} existe déjà`);
      }
    }

    return tableRepository.update(id, data);
  },

  async delete(id) {
    await this.getById(id);

    const commandesEnCours = await tableRepository.countCommandesEnCours(id);
    if (commandesEnCours > 0) {
      throw new ConflictError(
        `Impossible de supprimer la table: ${commandesEnCours} commande(s) en cours`
      );
    }

    return tableRepository.delete(id);
  },
};

export default tableService;
