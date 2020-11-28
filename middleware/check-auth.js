const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = require('../nodemon.json')


// third param next allow to go to the next middleware
function checkAuth(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, ACCESS_TOKEN_SECRET.env.JWT_KEY);
        req.userData = decodeToken;
        next();
    }catch(error) {
        return res.status(401).json({
            'message': "Invalid or expired token provided",
            'error': error
        });
    }
}

module.exports = {
    checkAuth: checkAuth
}