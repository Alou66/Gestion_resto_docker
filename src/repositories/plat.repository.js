/**
 * Repository pour les Plats
 * Gère l'accès aux données de la table Plat dans la base de données
 */

import prisma from '../config/prisma.js';
import { BaseRepository } from './base.repository.js';

/**
 * Repository spécifique pour les plats
 * Hérite des opérations de base et ajoute des opérations spécifiques
 */
class PlatRepository extends BaseRepository {
  constructor() {
    super('Plat');
  }
  /**
   * Trouver un plat par son nom
   * @param {string} nom - Nom du plat
   * @returns {Promise<Object|null>} Plat ou null
   */
  async findByNom(nom) {
    return prisma.plat.findFirst({
      where: { nom: { equals: nom, mode: 'insensitive' } },
    });
  }

  /**
   * Trouver les plats par catégorie
   * @param {string} categorie - Catégorie du plat
   * @returns {Promise<Array>} Tableau des plats de la catégorie
   */
  async findByCategorie(categorie) {
    return prisma.plat.findMany({
      where: { categorie },
    });
  }

  /**
   * Trouver les plats disponibles
   * @returns {Promise<Array>} Tableau des plats disponibles
   */
  async findDisponibles() {
    return prisma.plat.findMany({
      where: { statut: 'DISPONIBLE' },
    });
  }

  /**
   * Compter les commandes EN_COURS pour un plat
   * @param {number} platId - ID du plat
   * @returns {Promise<number>} Nombre de commandes EN_COURS
   */
  async countCommandesEnCours(platId) {
    return prisma.commande.count({
      where: {
        platId,
        statut: 'EN_COURS',
      },
    });
  }

  /**
   * Trouver un plat par ID avec ses commandes
   * @param {number} id - ID du plat
   * @returns {Promise<Object|null>} Plat avec ses commandes
   */
  async findByIdWithCommandes(id) {
    return prisma.plat.findUnique({
      where: { id },
      include: {
        commandes: true,
      },
    });
  }
}

// Export d'une instance singleton
const platRepository = new PlatRepository();

export default platRepository;
