import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Product Name is required",
    "string.min": "Name must be at least 2 characters",
  }),

  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),

  stock: Joi.number().min(0).required().messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be negative",
  }),

  description: Joi.string().allow("").max(500),
}).unknown(true);
