/**
 * Repository pour les Tables
 * Gère l'accès aux données de la table Table dans la base de données
 */

import prisma from '../config/prisma.js';
import { BaseRepository } from './base.repository.js';

/**
 * Repository spécifique pour les tables
 * Hérite des opérations de base et ajoute des opérations spécifiques
 */
class TableRepository extends BaseRepository {
  constructor() {
    super('Table');
  }
  /**
   * Trouver une table par son numéro unique
   * @param {number} numero - Numéro de la table
   * @returns {Promise<Object|null>} Table ou null
   */
  async findByNumero(numero) {
    return prisma.table.findUnique({
      where: { numero },
    });
  }

  /**
   * Vérifier si un numéro de table existe déjà
   * @param {number} numero - Numéro à vérifier
   * @returns {Promise<boolean>} true si le numéro existe
   */
  async numeroExists(numero) {
    const count = await prisma.table.count({
      where: { numero },
    });
    return count > 0;
  }

  /**
   * Compter les commandes EN_COURS pour une table
   * @param {number} tableId - ID de la table
   * @returns {Promise<number>} Nombre de commandes EN_COURS
   */
  async countCommandesEnCours(tableId) {
    return prisma.commande.count({
      where: {
        tableId,
        statut: 'EN_COURS',
      },
    });
  }

  /**
   * Récupérer toutes les tables avec leurs affectations de serveurs
   * @returns {Promise<Array>} Tableau des tables avec serveurs affectés
   */
  async findAllWithServeurs() {
    return prisma.table.findMany({
      include: {
        affectations: {
          include: {
            serveur: true,
          },
        },
      },
    });
  }
}

// Export d'une instance singleton
const tableRepository = new TableRepository();

export default tableRepository;
