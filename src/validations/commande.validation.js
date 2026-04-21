import { z } from 'zod';

export const createCommandeSchema = z.object({
  tableId: z.string({
    required_error: 'L\'ID de la table est obligatoire',
    invalid_type_error: 'L\'ID de la table doit être une chaîne de caractères',
  }).cuid('L\'ID de la table doit être un CUID valide'),
  
  serveurId: z.string({
    required_error: 'L\'ID du serveur est obligatoire',
    invalid_type_error: 'L\'ID du serveur doit être une chaîne de caractères',
  }).cuid('L\'ID du serveur doit être un CUID valide'),
  
  platId: z.string({
    required_error: 'L\'ID du plat est obligatoire',
    invalid_type_error: 'L\'ID du plat doit être une chaîne de caractères',
  }).cuid('L\'ID du plat doit être un CUID valide'),
  
  quantite: z.number({
    required_error: 'La quantité est obligatoire',
    invalid_type_error: 'La quantité doit être un nombre',
  }).int('La quantité doit être un entier').positive('La quantité doit être supérieure à 0'),
});

export const updateCommandeSchema = z.object({
  statut: z.enum(['EN_COURS', 'SERVIE', 'ANNULEE'], {
    required_error: 'Le statut est obligatoire',
    invalid_type_error: 'Le statut doit être EN_COURS, SERVIE ou ANNULEE',
  }),
});

export const commandeParamsSchema = z.object({
  id: z.string({
    invalid_type_error: 'L\'ID doit être une chaîne de caractères',
  }).cuid('L\'ID doit être un CUID valide'),
});

export const commandeValidation = {
  create: createCommandeSchema,
  update: updateCommandeSchema,
  params: commandeParamsSchema,
};
