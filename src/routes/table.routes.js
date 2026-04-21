/**
 * Routes pour les Tables
 * Endpoints: GET, POST, PUT, DELETE
 */
import { Router } from 'express';
import tableController from '../controllers/table.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { tableValidation } from '../validations/table.validation.js';

const router = Router();

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Récupérer toutes les tables
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: Liste des tables
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get('/', tableController.getAll);

/**
 * @swagger
 * /api/tables/{id}:
 *   get:
 *     summary: Récupérer une table par ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID de la table
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Table trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Table non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', validate(tableValidation.params), tableController.getById);

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Créer une nouvelle table
 *     tags: [Tables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TableCreate'
 *     responses:
 *       201:
 *         description: Table créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Numéro de table déjà existant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validate(tableValidation.create), tableController.create);

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     summary: Mettre à jour une table
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID de la table
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TableUpdate'
 *     responses:
 *       200:
 *         description: Table mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Table non trouvée
 */
router.put('/:id', validate(tableValidation.params), validate(tableValidation.update), tableController.update);

/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     summary: Supprimer une table
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID de la table
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Table supprimée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Table non trouvée
 *       409:
 *         description: Commandes en cours existantes
 */
router.delete('/:id', validate(tableValidation.params), tableController.delete);

export default router;