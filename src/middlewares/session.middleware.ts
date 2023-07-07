import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();

exports.authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send('Login needed for this route');
    }
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    if(!data) {
      throw new Error()
    }
    next();
  } catch {
    return res.status(403).send('Login needed for this route');
  }
};