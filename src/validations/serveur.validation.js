import { z } from 'zod';

export const createServeurSchema = z.object({
  prenom: z.string({
    required_error: 'Le prénom est obligatoire',
    invalid_type_error: 'Le prénom doit être une chaîne de caractères',
  }).min(2, 'Le prénom doit contenir au moins 2 caractères'),
  
  nom: z.string({
    required_error: 'Le nom est obligatoire',
    invalid_type_error: 'Le nom doit être une chaîne de caractères',
  }).min(2, 'Le nom doit contenir au moins 2 caractères'),
  
  email: z.string({
    required_error: 'L\'email est obligatoire',
    invalid_type_error: 'L\'email doit être une chaîne de caractères',
  }).email('Format d\'email invalide'),
  
  telephone: z.string({
    required_error: 'Le téléphone est obligatoire',
    invalid_type_error: 'Le téléphone doit être une chaîne de caractères',
  }).min(9, 'Le téléphone doit contenir au moins 9 caractères').regex(
      /^221(77|78|76|70|75)\d{7}$/,
      "Le téléphone doit commencer par 221 suivi de 77, 78, 76, 70 ou 75 et contenir 7 chiffres",
    ),
});

export const updateServeurSchema = z.object({
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').optional(),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').optional(),
  email: z.string().email('Format d\'email invalide').optional(),
  telephone: z.string()
    .min(9, 'Le téléphone doit contenir au moins 9 caractères')
    .regex(/^221(77|78|76|70|75)\d{7}$/, "Format de téléphone invalide")
    .optional(),
});

export const serveurParamsSchema = z.object({
  id: z.string({
    invalid_type_error: 'L\'ID doit être une chaîne de caractères',
  }).cuid('L\'ID doit être un CUID valide'),
});

export const serveurValidation = {
  create: createServeurSchema,
  update: updateServeurSchema,
  params: serveurParamsSchema,
};