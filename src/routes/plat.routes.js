/**
 * Routes pour les Plats
 * Endpoints: GET, POST, PUT, DELETE + filtres par catégorie/disponibilité
 */
import { Router } from 'express';
import platController from '../controllers/plat.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { platValidation } from '../validations/plat.validation.js';

const router = Router();

/**
 * @swagger
 * /api/plats:
 *   get:
 *     summary: Récupérer tous les plats
 *     tags: [Plats]
 *     responses:
 *       200:
 *         description: Liste des plats
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get('/', platController.getAll);

/**
 * @swagger
 * /api/plats/categorie/{categorie}:
 *   get:
 *     summary: Récupérer les plats par catégorie
 *     tags: [Plats]
 *     parameters:
 *       - in: path
 *         name: categorie
 *         required: true
 *         description: Catégorie du plat
 *         schema:
 *           type: string
 *           enum: [ENTREE, PLAT, DESSERT, BOISSON]
 *     responses:
 *       200:
 *         description: Liste des plats de la catégorie
 */
router.get('/categorie/:categorie', platController.getByCategorie);

/**
 * @swagger
 * /api/plats/disponibles:
 *   get:
 *     summary: Récupérer les plats disponibles
 *     tags: [Plats]
 *     responses:
 *       200:
 *         description: Liste des plats disponibles
 */
router.get('/disponibles', platController.getDisponibles);

/**
 * @swagger
 * /api/plats/{id}:
 *   get:
 *     summary: Récupérer un plat par ID
 *     tags: [Plats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID du plat
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plat trouvé
 *       404:
 *         description: Plat non trouvé
 */
router.get('/:id', validate(platValidation.params), platController.getById);

/**
 * @swagger
 * /api/plats:
 *   post:
 *     summary: Créer un nouveau plat
 *     tags: [Plats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlatCreate'
 *     responses:
 *       201:
 *         description: Plat créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Données invalides
 */
router.post('/', validate(platValidation.create), platController.create);

/**
 * @swagger
 * /api/plats/{id}:
 *   put:
 *     summary: Mettre à jour un plat
 *     tags: [Plats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID du plat
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlatUpdate'
 *     responses:
 *       200:
 *         description: Plat mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Plat non trouvé
 */
router.put('/:id', validate(platValidation.params), validate(platValidation.update), platController.update);

/**
 * @swagger
 * /api/plats/{id}:
 *   delete:
 *     summary: Supprimer un plat
 *     tags: [Plats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID CUID du plat
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plat supprimé
 *       404:
 *         description: Plat non trouvé
 *       409:
 *         description: Commandes en cours existantes
 */
router.delete('/:id', validate(platValidation.params), platController.delete);

export default router;