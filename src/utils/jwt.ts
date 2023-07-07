const jwt = require('jsonwebtoken');

exports.generateJwt = (EMAIL: string) => {
    return jwt.sign({EMAIL: EMAIL}, process.env.TOKEN_SECRET);
}