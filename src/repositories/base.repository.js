/**
 * Repository de base générique
 * Pattern Repository pour l'accès aux données avec Prisma
 * 
 * Ce repository fournit les opérations CRUD de base
 * qui peuvent être héritées ou surchargées par les repositories spécifiques
 */

import prisma from '../config/prisma.js';

/**
 * Classe de base pour les repositories
 * Encapsule les opérations Prisma courantes
 */
export class BaseRepository {
  /**
   * Constructeur
   * @param {string} modelName - Nom du modèle Prisma (ex: 'table', 'serveur')
   */
  constructor(modelName) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  /**
   * Récupérer tous les enregistrements
   * @returns {Promise<Array>} Tableau d'enregistrements
   */
  async findAll() {
    return this.prisma[this.modelName].findMany();
  }

  /**
   * Récupérer un enregistrement par ID
   * @param {number} id - ID de l'enregistrement
   * @returns {Promise<Object|null>} Enregistrement ou null
   */
  async findById(id) {
    return this.prisma[this.modelName].findUnique({
      where: { id },
    });
  }

  /**
   * Récupérer un enregistrement par champ unique
   * @param {string} field - Nom du champ
   * @param {*} value - Valeur du champ
   * @returns {Promise<Object|null>} Enregistrement ou null
   */
  async findByUnique(field, value) {
    return this.prisma[this.modelName].findUnique({
      where: { [field]: value },
    });
  }

  /**
   * Créer un nouvel enregistrement
   * @param {Object} data - Données à créer
   * @returns {Promise<Object>} Enregistrement créé
   */
  async create(data) {
    return this.prisma[this.modelName].create({
      data,
    });
  }

  /**
   * Mettre à jour un enregistrement
   * @param {number} id - ID de l'enregistrement
   * @param {Object} data - Données à mettre à jour
   * @returns {Promise<Object>} Enregistrement mis à jour
   */
  async update(id, data) {
    return this.prisma[this.modelName].update({
      where: { id },
      data,
    });
  }

  /**
   * Supprimer un enregistrement
   * @param {number} id - ID de l'enregistrement
   * @returns {Promise<Object>} Enregistrement supprimé
   */
  async delete(id) {
    return this.prisma[this.modelName].delete({
      where: { id },
    });
  }

  /**
   * Compter le nombre d'enregistrements
   * @returns {Promise<number>} Nombre d'enregistrements
   */
  async count() {
    return this.prisma[this.modelName].count();
  }

  /**
   * Vérifier si un enregistrement existe
   * @param {number} id - ID de l'enregistrement
   * @returns {Promise<boolean>} true si existant
   */
  async exists(id) {
    const count = await this.prisma[this.modelName].count({
      where: { id },
    });
    return count > 0;
  }
}

export default BaseRepository;
