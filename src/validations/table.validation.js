import { z } from 'zod';

export const createTableSchema = z.object({
  numero: z.number(
    {
      required_error: 'Le numéro de table est obligatoire',
      invalid_type_error: 'Le numéro doit être un nombre',
    }
  ),
  capacite: z.number(
    {
      required_error: 'La capacité est obligatoire',
      invalid_type_error: 'La capacité doit être un nombre',
    }
  ).int('La capacité doit être un entier').positive('La capacité doit être supérieure à 0'),
  emplacement: z.enum(['TERRASSE', 'INTERIEUR', 'VIP'], {
    required_error: "L'emplacement est obligatoire",
    invalid_type_error: "L'emplacement doit être TERRASSE, INTERIEUR ou VIP",
  }),
});

export const updateTableSchema = z.object({
  numero: z.number().optional(),
  capacite: z.number().int().positive('La capacité doit être supérieure à 0').optional(),
  emplacement: z.enum(['TERRASSE', 'INTERIEUR', 'VIP']).optional(),
});

export const tableParamsSchema = z.object({
  id: z.string({
    invalid_type_error: 'L\'ID doit être une chaîne de caractères',
  }).cuid('L\'ID doit être un CUID valide'),
});

export const tableValidation = {
  create: createTableSchema,
  update: updateTableSchema,
  params: tableParamsSchema,
};