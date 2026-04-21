/**
 * Service pour les Plats
 * Logique métier pour la gestion des plats du restaurant
 * 
 * Règles de gestion:
 * - Nom obligatoire (min 2 caractères)
 * - Catégorie parmi: ENTREE, PLAT, DESSERT, BOISSON
 * - Prix > 0
 * - Statut: DISPONIBLE ou INDISPONIBLE
 * - Interdire modification/suppression si des commandes EN_COURS existent
 */

import platRepository from '../repositories/plat.repository.js';
import { NotFoundError, ConflictError } from '../exceptions/http-error.exception.js';

export const platService = {
  async getAll() {
    return platRepository.findAll();
  },

  async getById(id) {
    const plat = await platRepository.findById(id);
    if (!plat) {
      throw new NotFoundError(`Plat avec ID ${id} non trouvé`);
    }
    return plat;
  },

  async create(data) {
    return platRepository.create(data);
  },

  async update(id, data) {
    await this.getById(id);

    // Vérifier qu'aucune commande EN_COURS n'existe
    const commandesEnCours = await platRepository.countCommandesEnCours(id);
    if (commandesEnCours > 0) {
      throw new ConflictError(
        `Impossible de modifier le plat: ${commandesEnCours} commande(s) en cours`
      );
    }

    return platRepository.update(id, data);
  },

  async delete(id) {
    await this.getById(id);

    const commandesEnCours = await platRepository.countCommandesEnCours(id);
    if (commandesEnCours > 0) {
      throw new ConflictError(
        `Impossible de supprimer le plat: ${commandesEnCours} commande(s) en cours`
      );
    }

    return platRepository.delete(id);
  },

  async verifierDisponibilite(platId) {
    const plat = await this.getById(platId);
    if (plat.statut === 'INDISPONIBLE') {
      throw new ConflictError(`Le plat "${plat.nom}" n'est pas disponible`);
    }
    return plat;
  },

  async getByCategorie(categorie) {
    return platRepository.findByCategorie(categorie);
  },

  async getDisponibles() {
    return platRepository.findDisponibles();
  },
};

export default platService;
