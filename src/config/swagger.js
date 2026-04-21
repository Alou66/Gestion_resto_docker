import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Restaurant RESTO 221',
      version: '1.0.0',
      description: 'API pour la gestion des tables, serveurs, plats et commandes du restaurant',
      contact: {
        name: 'Support',
        email: 'support@resto221.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    tags: [
      { name: 'Tables', description: 'Gestion des tables du restaurant' },
      { name: 'Serveurs', description: 'Gestion des serveurs' },
      { name: 'Plats', description: 'Gestion du menu' },
      { name: 'Commandes', description: 'Gestion des commandes' }
    ],
    components: {
      schemas: {
        Table: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID unique (CUID)' },
            numero: { type: 'integer', description: 'Numéro unique de la table' },
            capacite: { type: 'integer', description: 'Nombre de places' },
            emplacement: { type: 'string', enum: ['TERRASSE', 'INTERIEUR', 'VIP'] }
          },
          required: ['numero', 'capacite', 'emplacement']
        },
        TableCreate: {
          type: 'object',
          properties: {
            numero: { type: 'integer', description: 'Numéro unique de la table' },
            capacite: { type: 'integer', description: 'Nombre de places' },
            emplacement: { type: 'string', enum: ['TERRASSE', 'INTERIEUR', 'VIP'] }
          },
          required: ['numero', 'capacite', 'emplacement']
        },
        TableUpdate: {
          type: 'object',
          properties: {
            numero: { type: 'integer' },
            capacite: { type: 'integer' },
            emplacement: { type: 'string', enum: ['TERRASSE', 'INTERIEUR', 'VIP'] }
          }
        },
        Serveur: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID unique (CUID)' },
            prenom: { type: 'string', description: 'Prénom du serveur' },
            nom: { type: 'string', description: 'Nom du serveur' },
            email: { type: 'string', format: 'email', description: 'Email unique' },
            telephone: { type: 'string', description: 'Numéro de téléphone' }
          },
          required: ['prenom', 'nom', 'email', 'telephone']
        },
        ServeurCreate: {
          type: 'object',
          properties: {
            prenom: { type: 'string', minLength: 2 },
            nom: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            telephone: { type: 'string', minLength: 10 }
          },
          required: ['prenom', 'nom', 'email', 'telephone']
        },
        ServeurUpdate: {
          type: 'object',
          properties: {
            prenom: { type: 'string', minLength: 2 },
            nom: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            telephone: { type: 'string', minLength: 10 }
          }
        },
        Plat: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID unique (CUID)' },
            nom: { type: 'string', description: 'Nom du plat' },
            categorie: { type: 'string', enum: ['ENTREE', 'PLAT', 'DESSERT', 'BOISSON'] },
            prix: { type: 'number', description: 'Prix en francs CFA', format: 'decimal' },
            statut: { type: 'string', enum: ['DISPONIBLE', 'INDISPONIBLE'] }
          },
          required: ['nom', 'categorie', 'prix']
        },
        PlatCreate: {
          type: 'object',
          properties: {
            nom: { type: 'string', minLength: 2 },
            categorie: { type: 'string', enum: ['ENTREE', 'PLAT', 'DESSERT', 'BOISSON'] },
            prix: { type: 'number', exclusiveMinimum: 0 },
            statut: { type: 'string', enum: ['DISPONIBLE', 'INDISPONIBLE'] }
          },
          required: ['nom', 'categorie', 'prix']
        },
        PlatUpdate: {
          type: 'object',
          properties: {
            nom: { type: 'string', minLength: 2 },
            categorie: { type: 'string', enum: ['ENTREE', 'PLAT', 'DESSERT', 'BOISSON'] },
            prix: { type: 'number', exclusiveMinimum: 0 },
            statut: { type: 'string', enum: ['DISPONIBLE', 'INDISPONIBLE'] }
          }
        },
        Commande: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID unique (CUID)' },
            tableId: { type: 'string', description: 'ID de la table (CUID)' },
            serveurId: { type: 'string', description: 'ID du serveur (CUID)' },
            platId: { type: 'string', description: 'ID du plat (CUID)' },
            quantite: { type: 'integer', minimum: 1 },
            montantTotal: { type: 'number', format: 'decimal' },
            statut: { type: 'string', enum: ['EN_COURS', 'SERVIE', 'ANNULEE'] },
            dateCommande: { type: 'string', format: 'date-time', description: 'Date générée automatiquement' }
          },
          required: ['tableId', 'serveurId', 'platId', 'quantite', 'dateCommande']
        },
        CommandeCreate: {
          type: 'object',
          properties: {
            tableId: { type: 'string', description: 'ID CUID de la table' },
            serveurId: { type: 'string', description: 'ID CUID du serveur' },
            platId: { type: 'string', description: 'ID CUID du plat' },
            quantite: { type: 'integer', minimum: 1 }
          },
          required: ['tableId', 'serveurId', 'platId', 'quantite']
        },
        CommandeUpdate: {
          type: 'object',
          properties: {
            statut: { type: 'string', enum: ['EN_COURS', 'SERVIE', 'ANNULEE'] }
          },
          required: ['statut']
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            data: { type: 'object', nullable: true }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Requête invalide',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: { success: false, message: 'Échec de la validation', data: null }
            }
          }
        },
        NotFound: {
          description: 'Ressource non trouvée',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: { success: false, message: 'Ressource non trouvée', data: null }
            }
          }
        },
        ServerError: {
          description: 'Erreur interne du serveur',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: { success: false, message: 'Erreur interne du serveur', data: null }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
