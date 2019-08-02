import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // criando userId com valor do id do usuario que vem no token de auth
    // esse userId fica dentro das requisições feitas por ele, assim podendo
    // ser utilizado em outros locais
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
