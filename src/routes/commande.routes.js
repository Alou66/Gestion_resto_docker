/**
 * Routes pour les Commandes
 * Endpoints: GET, POST, PATCH, DELETE + filtres par table/serveur
 */
import { Router } from 'express';
import commandeController from '../controllers/commande.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { commandeValidation } from '../validations/commande.validation.js';

const router = Router();

/**
 * @swagger
 * /api/commandes:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     tags: [Commandes]
 *     responses:
 *       200:
 *         description: Liste des commandes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get('/', commandeController.getAll);

/**
 * @swagger
 * /api/commandes/table/{tableId}:
 *   get:
 *     summary: Récupérer les commandes d'une table
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         description: ID CUID de la table
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des commandes de la table
 */
router.get('/table/:tableId', commandeController.getByTableId);

/**
 * @swagger
 * /api/commandes/serveur/{serveurId}:
 *   get:
 *     summary: Récupérer les commandes d'un serveur
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: serveurId
 *         required: true
 *         description: ID CUID du serveur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des commandes du serveur
 */
router.get('/serveur/:serveurId', commandeController.getByServeurId);

/**
 * @swagger
 * /api/commandes/{id}:
 *   get:
 *     summary: Récupérer une commande par ID
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID de la commande
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande trouvée
 *       404:
 *         description: Commande non trouvée
 */
router.get('/:id', validate(commandeValidation.params), commandeController.getById);

/**
 * @swagger
 * /api/commandes:
 *   post:
 *     summary: Créer une nouvelle commande
 *     tags: [Commandes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommandeCreate'
 *     responses:
 *       201:
 *         description: Commande créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Table, serveur ou plat non trouvé
 *       409:
 *         description: Plat non disponible
 */
router.post('/', validate(commandeValidation.create), commandeController.create);

/**
 * @swagger
 * /api/commandes/{id}/statut:
 *   patch:
 *     summary: Mettre à jour le statut d'une commande
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID de la commande
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommandeUpdate'
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Commande non trouvée
 */
router.patch('/:id/statut', validate(commandeValidation.params), validate(commandeValidation.update), commandeController.updateStatut);

/**
 * @swagger
 * /api/commandes/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID de la commande
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande supprimée
 *       404:
 *         description: Commande non trouvée
 *       409:
 *         description: Commande en cours ne peut pas être supprimée
 */
router.delete('/:id', validate(commandeValidation.params), commandeController.delete);

export default router;