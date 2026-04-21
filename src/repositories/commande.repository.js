/**
 * Repository pour les Commandes
 * Gère l'accès aux données de la table Commande dans la base de données
 */

import prisma from '../config/prisma.js';
import { BaseRepository } from './base.repository.js';

/**
 * Repository spécifique pour les commandes
 * Hérite des opérations de base et ajoute des opérations spécifiques
 */
class CommandeRepository extends BaseRepository {
  constructor() {
    super('Commande');
  }
  /**
   * Créer une nouvelle commande
   * @param {Object} data - Données de la commande
   * @returns {Promise<Object>} Commande créée
   */
  async create(data) {
    return prisma.commande.create({
      data: {
        tableId: data.tableId,
        serveurId: data.serveurId,
        platId: data.platId,
        quantite: data.quantite,
        montantTotal: data.montantTotal,
        dateCommande: data.dateCommande,
        statut: data.statut || 'EN_COURS',
      },
    });
  }

  /**
   * Récupérer toutes les commandes
   * @returns {Promise<Array>} Tableau des commandes
   */
  async findAll() {
    return prisma.commande.findMany({
      include: {
        table: true,
        serveur: true,
        plat: true,
      },
      orderBy: {
        dateCommande: 'desc',
      },
    });
  }

  /**
   * Récupérer une commande par ID avec toutes les relations
   * @param {number} id - ID de la commande
   * @returns {Promise<Object|null>} Commande avec relations
   */
  async findById(id) {
    return prisma.commande.findUnique({
      where: { id },
      include: {
        table: true,
        serveur: true,
        plat: true,
      },
    });
  }

  /**
   * Mettre à jour le statut d'une commande
   * @param {number} id - ID de la commande
   * @param {string} statut - Nouveau statut
   * @returns {Promise<Object>} Commande mise à jour
   */
  async updateStatut(id, statut) {
    return prisma.commande.update({
      where: { id },
      data: { statut },
    });
  }

  /**
   * Supprimer une commande
   * @param {number} id - ID de la commande
   * @returns {Promise<Object>} Commande supprimée
   */
  async delete(id) {
    return prisma.commande.delete({
      where: { id },
    });
  }

  /**
   * Trouver les commandes par ID de table
   * @param {number} tableId - ID de la table
   * @returns {Promise<Array>} Tableau des commandes de la table
   */
  async findByTableId(tableId) {
    return prisma.commande.findMany({
      where: { tableId },
      include: {
        serveur: true,
        plat: true,
      },
      orderBy: {
        dateCommande: 'desc',
      },
    });
  }

  /**
   * Trouver les commandes par ID de serveur
   * @param {number} serveurId - ID du serveur
   * @returns {Promise<Array>} Tableau des commandes du serveur
   */
  async findByServeurId(serveurId) {
    return prisma.commande.findMany({
      where: { serveurId },
      include: {
        table: true,
        plat: true,
      },
      orderBy: {
        dateCommande: 'desc',
      },
    });
  }

  /**
   * Compter les commandes par statut
   * @param {string} statut - Statut des commandes
   * @returns {Promise<number>} Nombre de commandes
   */
  async countByStatut(statut) {
    return prisma.commande.count({
      where: { statut },
    });
  }
}

// Export d'une instance singleton
const commandeRepository = new CommandeRepository();

export default commandeRepository;
