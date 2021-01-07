const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.header('authentication-token');
    const decoded = jwt.verify(
        token,
        config.get('jsonWebTokenSecret')
    );
    req.user = decoded.user;
    next();
}