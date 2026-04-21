/**
 * Routes pour les Serveurs
 * Endpoints: GET, POST, PUT, DELETE
 */
import { Router } from 'express';
import serveurController from '../controllers/serveur.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { serveurValidation } from '../validations/serveur.validation.js';

const router = Router();

/**
 * @swagger
 * /api/serveurs:
 *   get:
 *     summary: Récupérer tous les serveurs
 *     tags: [Serveurs]
 *     responses:
 *       200:
 *         description: Liste des serveurs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get('/', serveurController.getAll);

/**
 * @swagger
 * /api/serveurs/{id}:
 *   get:
 *     summary: Récupérer un serveur par ID
 *     tags: [Serveurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID du serveur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serveur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Serveur non trouvé
 */
router.get('/:id', validate(serveurValidation.params), serveurController.getById);

/**
 * @swagger
 * /api/serveurs:
 *   post:
 *     summary: Créer un nouveau serveur
 *     tags: [Serveurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServeurCreate'
 *     responses:
 *       201:
 *         description: Serveur créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/', validate(serveurValidation.create), serveurController.create);

/**
 * @swagger
 * /api/serveurs/{id}:
 *   put:
 *     summary: Mettre à jour un serveur
 *     tags: [Serveurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID du serveur
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServeurUpdate'
 *     responses:
 *       200:
 *         description: Serveur mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Serveur non trouvé
 *       409:
 *         description: Email déjà utilisé
 */
router.put('/:id', validate(serveurValidation.params), validate(serveurValidation.update), serveurController.update);

/**
 * @swagger
 * /api/serveurs/{id}:
 *   delete:
 *     summary: Supprimer un serveur
 *     tags: [Serveurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID du serveur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serveur supprimé
 *       404:
 *         description: Serveur non trouvé
 *       409:
 *         description: Commandes en cours existantes
 */
router.delete('/:id', validate(serveurValidation.params), serveurController.delete);

export default router;