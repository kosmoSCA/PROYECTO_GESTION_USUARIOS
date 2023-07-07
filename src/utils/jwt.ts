const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();

exports.generateJwt = (EMAIL: string) => {
    return jwt.sign({EMAIL: EMAIL}, process.env.TOKEN_SECRET);
}