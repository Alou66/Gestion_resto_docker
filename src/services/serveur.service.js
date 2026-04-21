/**
 * Service pour les Serveurs
 * Logique métier pour la gestion des serveurs du restaurant
 * 
 * Règles de gestion:
 * - Prénom et nom obligatoires (min 2 caractères)
 * - Email unique
 * - Téléphone avec format minimal
 * - Interdire modification/suppression si des commandes EN_COURS existent
 */

import serveurRepository from '../repositories/serveur.repository.js';
import { NotFoundError, ConflictError } from '../exceptions/http-error.exception.js';

export const serveurService = {
  async getAll() {
    return serveurRepository.findAll();
  },

  async getById(id) {
    const serveur = await serveurRepository.findById(id);
    if (!serveur) {
      throw new NotFoundError(`Serveur avec ID ${id} non trouvé`);
    }
    return serveur;
  },

  async create(data) {
    const existingEmail = await serveurRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new ConflictError(`Un utilisateur avec le email ${data.email} existe déjà`);
    }
    return serveurRepository.create(data);
  },

  async update(id, data) {
    await this.getById(id);

    // Vérifier qu'aucune commande EN_COURS n'existe
    const commandesEnCours = await serveurRepository.countCommandesEnCours(id);
    if (commandesEnCours > 0) {
      throw new ConflictError(
        `Impossible de modifier le serveur: ${commandesEnCours} commande(s) en cours`
      );
    }

    // Si mise à jour de l'email, vérifier l'unicité
    if (data.email) {
      const existingEmail = await serveurRepository.findByEmail(data.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictError(`Un utilisateur avec le email ${data.email} existe déjà`);
      }
    }

    return serveurRepository.update(id, data);
  },

  async delete(id) {
    await this.getById(id);

    const commandesEnCours = await serveurRepository.countCommandesEnCours(id);
    if (commandesEnCours > 0) {
      throw new ConflictError(
        `Impossible de supprimer le serveur: ${commandesEnCours} commande(s) en cours`
      );
    }

    return serveurRepository.delete(id);
  },
};

export default serveurService;
