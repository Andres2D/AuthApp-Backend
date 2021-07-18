const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, userLogin, renewUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

//Create new user
router.post( '/new',[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'passwrod is required').isLength({min: 6}),
    validateFields
], createUser);

//User login
router.post( '/', [
    check('email', 'email is required').isEmail(),
    check('password', 'passwrod is required').isLength({min: 6}),
    validateFields
], userLogin);

//Validate and revalidate token
router.get( '/renew', validateJWT, renewUser);

module.exports = router;