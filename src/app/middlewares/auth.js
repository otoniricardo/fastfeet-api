import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader) return res.status(401).json({ error: 'token not provided' });

  const [, token] = authheader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'token invalid' });
  }
};
