/**
 * Repository pour les Serveurs
 * Gère l'accès aux données de la table Serveur dans la base de données
 */

import prisma from '../config/prisma.js';
import { BaseRepository } from './base.repository.js';

/**
 * Repository spécifique pour les serveurs
 * Hérite des opérations de base et ajoute des opérations spécifiques
 */
class ServeurRepository extends BaseRepository {
  constructor() {
    super('Serveur');
  }
  /**
   * Trouver un serveur par son email unique
   * @param {string} email - Email du serveur
   * @returns {Promise<Object|null>} Serveur ou null
   */
  async findByEmail(email) {
    return prisma.serveur.findUnique({
      where: { email },
    });
  }

  /**
   * Vérifier si un email de serveur existe déjà
   * @param {string} email - Email à vérifier
   * @returns {Promise<boolean>} true si l'email existe
   */
  async emailExists(email) {
    const count = await prisma.serveur.count({
      where: { email },
    });
    return count > 0;
  }

  /**
   * Vérifier si un serveur a une commande EN_COURS
   * @param {string} serveurId - ID du serveur
   * @returns {Promise<boolean>} true si le serveur a une commande en cours
   */
  async hasCommandeEnCours(serveurId) {
    const count = await prisma.commande.count({
      where: {
        serveurId,
        statut: 'EN_COURS',
      },
    });
    return count > 0;
  }

  /**
   * Compter les commandes EN_COURS pour un serveur
   * @deprecated Utiliser hasCommandeEnCours pour une vérification booléenne
   * @param {string} serveurId - ID du serveur
   * @returns {Promise<number>} Nombre de commandes EN_COURS
   */
  async countCommandesEnCours(serveurId) {
    return prisma.commande.count({
      where: {
        serveurId,
        statut: 'EN_COURS',
      },
    });
  }

  /**
   * Récupérer tous les serveurs avec leurs tables affectées
   * @returns {Promise<Array>} Tableau des serveurs avec leurs tables
   */
  async findAllWithTables() {
    return prisma.serveur.findMany({
      include: {
        affectations: {
          include: {
            table: true,
          },
        },
      },
    });
  }

  /**
   * Trouver un serveur par ID avec ses affectations
   * @param {number} id - ID du serveur
   * @returns {Promise<Object|null>} Serveur avec ses affectations
   */
  async findByIdWithAffectations(id) {
    return prisma.serveur.findUnique({
      where: { id },
      include: {
        affectations: {
          include: {
            table: true,
          },
        },
      },
    });
  }
}

// Export d'une instance singleton
const serveurRepository = new ServeurRepository();

export default serveurRepository;
