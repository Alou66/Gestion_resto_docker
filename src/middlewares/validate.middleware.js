import { ValidationError } from '../exceptions/http-error.exception.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const shape = schema.shape;
    const allowedFields = Object.keys(shape);
    
    // Separate params and body fields
    const isParamsSchema = allowedFields.includes('id');
    
    if (isParamsSchema) {
      // Validate only params
      const result = schema.safeParse(req.params);
      if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
          champ: issue.path.join('.'),
          message: issue.message,
        }));
        return next(new ValidationError('Échec de la validation', errors));
      }
      req.params = result.data;
      return next();
    }

    // Validate body - include all fields from req.body that are in schema
    const filteredBody = {};
    for (const key of allowedFields) {
      if (req.body && req.body[key] !== undefined) {
        filteredBody[key] = req.body[key];
      }
    }

    // If body is empty, allow it (for partial updates)
    const dataToValidate = Object.keys(filteredBody).length > 0 ? filteredBody : {};
    
    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        champ: issue.path.join('.'),
        message: issue.message,
      }));
      return next(new ValidationError('Échec de la validation', errors));
    }

    req.body = result.data;
    next();
  };
};