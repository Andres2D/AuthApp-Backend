const jwt = require('jsonwebtoken');


const generateJWT = ( _id, name ) => {

    const payload = {_id, name};

    return new Promise( (resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (error, token) => {
            if(error){
                reject(error);
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}