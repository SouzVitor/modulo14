import Joi from 'joi';

const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  administrador: Joi.boolean().required(),
  _id: Joi.string().required(),
});

export default usuarioSchema;




