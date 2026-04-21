import { z } from 'zod';

export const createPlatSchema = z.object({
  nom: z.string({
    required_error: 'Le nom du plat est obligatoire',
    invalid_type_error: 'Le nom doit être une chaîne de caractères',
  }).min(2, 'Le nom doit contenir au moins 2 caractères'),
  
  categorie: z.enum(['ENTREE', 'PLAT', 'DESSERT', 'BOISSON'], {
    required_error: 'La catégorie est obligatoire',
    invalid_type_error: 'La catégorie doit être ENTREE, PLAT, DESSERT ou BOISSON',
  }),
  
  prix: z.number({
    required_error: 'Le prix est obligatoire',
    invalid_type_error: 'Le prix doit être un nombre',
  }).positive('Le prix doit être supérieur à 0'),
  
  statut: z.enum(['DISPONIBLE', 'INDISPONIBLE']).optional(),
});

export const updatePlatSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').optional(),
  categorie: z.enum(['ENTREE', 'PLAT', 'DESSERT', 'BOISSON']).optional(),
  prix: z.number().positive('Le prix doit être supérieur à 0').optional(),
  statut: z.enum(['DISPONIBLE', 'INDISPONIBLE']).optional(),
});

export const platParamsSchema = z.object({
  id: z.string({
    invalid_type_error: 'L\'ID doit être une chaîne de caractères',
  }).cuid('L\'ID doit être un CUID valide'),
});

export const platValidation = {
  create: createPlatSchema,
  update: updatePlatSchema,
  params: platParamsSchema,
};