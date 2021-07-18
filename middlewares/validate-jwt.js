const { response } = require("express");
const jwt = require('jsonwebtoken')


const validateJWT =  (req, res = response, next) => {
    
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            ms: 'Invalid token'
        })
    }

    try{

        const { _id, name, email} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req._id = _id;
        req.name = name;
        req.email = email;

    }catch(error){
        return res.status(401).json({
            ok: false,
            ms: 'Invalid token'
        });
    }

    next();

}

module.exports = {
    validateJWT
}