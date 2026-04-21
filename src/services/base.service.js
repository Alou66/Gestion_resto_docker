/**
 * Service de base générique
 * Logique métier de base pour les opérations CRUD
 * 
 * Pattern Service: encapsule la logique métier
 * Séparation des préoccupations (Separation of Concerns)
 */

import { NotFoundError, ConflictError } from '../exceptions/http-error.exception.js';

/**
 * Classe de base pour les services
 * Fournit les opérations CRUD de base avec gestion des erreurs
 */
export class BaseService {
  /**
   * Constructeur
   * @param {Object} repository - Repository pour l'accès aux données
   * @param {string} entityName - Nom de l'entité pour les messages d'erreur
   */
  constructor(repository, entityName) {
    this.repository = repository;
    this.entityName = entityName;
  }

  /**
   * Récupérer tous les enregistrements
   * @returns {Promise<Array>} Tableau des enregistrements
   */
  async getAll() {
    return this.repository.findAll();
  }

  /**
   * Récupérer un enregistrement par ID
   * @param {number} id - ID de l'enregistrement
   * @returns {Promise<Object>} Enregistrement trouvé
   * @throws {NotFoundError} Si l'enregistrement n'existe pas
   */
  async getById(id) {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new NotFoundError(`${this.entityName} avec ID ${id} non trouvé(e)`);
    }
    return result;
  }

  /**
   * Créer un nouvel enregistrement
   * @param {Object} data - Données à créer
   * @returns {Promise<Object>} Enregistrement créé
   */
  async create(data) {
    return this.repository.create(data);
  }

  /**
   * Mettre à jour un enregistrement
   * @param {number} id - ID de l'enregistrement
   * @param {Object} data - Données à mettre à jour
   * @returns {Promise<Object>} Enregistrement mis à jour
   * @throws {NotFoundError} Si l'enregistrement n'existe pas
   */
  async update(id, data) {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  /**
   * Supprimer un enregistrement
   * @param {number} id - ID de l'enregistrement
   * @returns {Promise<Object>} Enregistrement supprimé
   * @throws {NotFoundError} Si l'enregistrement n'existe pas
   */
  async delete(id) {
    await this.getById(id);
    return this.repository.delete(id);
  }

  /**
   * Vérifier si un enregistrement existe
   * @param {number} id - ID de l'enregistrement
   * @returns {Promise<boolean>} true si existant
   */
  async exists(id) {
    return this.repository.exists(id);
  }
}
