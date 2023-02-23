import Joi from 'joi';
import tlds from 'tlds';

Joi.link([ 'tld' ]);
Joi.string().hostname({ tlds }).required();

export default Joi;
