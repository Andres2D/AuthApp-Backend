const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const createUser = async(req, res = response) => {

    const {name, email, password} = req.body;

    try{

        // Check email
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'The email is currently used'
            }); 
        }

        // Create user with model
        const dbUser = new User(req.body);

        // Hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generate JWT
        const token = await generateJWT(dbUser._id, dbUser.name);

        // Create DB User
        await dbUser.save();

        // Generate response succesfull
        return res.status(201).json({
            ok: true,
            uid: dbUser._id,
            name,
            email,
            token
        });

    }catch(error){
        return res.json({
            ok: false,
            ms: 'Please contac the administrator'
        });
    }
}

const userLogin = async(req, res = response) => {

    const {email, password} = req.body;

    try{

        // Check user
        const dbUser = await User.findOne({email});
        
        if( !dbUser ){
            return res.status(400).json({
                ok: false,
                msg: 'The email don´t exist'
            });
        }

        // Confirm password match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if( ! validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        // Generate JWT
        const token = await generateJWT(dbUser._id, dbUser.name);

        // Response
        return res.json({
            ok: true,
            uid: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });


    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Please contac the administrator'
        });
    }
}

const renewUser =  async(req, res = response) => {

    const { _id } = req;
    // Read the db
    const dbUser = await User.findById(_id);

    const token = await generateJWT(_id, dbUser.name);

    return res.json({
        ok: true,
        uid: _id,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
}

module.exports = {
    createUser,
    userLogin,
    renewUser
}