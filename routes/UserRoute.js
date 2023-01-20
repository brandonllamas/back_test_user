//#region Imports
const { Router } = require('express');
const { login } = require('../app/controllers/auth');
const { getUser, getAllUsers, createUser, updateUser } = require('../app/controllers/UsersController');

const router  = Router()
//#endregion

//#region  Middleware login
const authValid = (req, res, next) =>{
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
    }else{
        res.json({
            code:403,
            msg:"Access denied"
        })
    }
    
}
//#endregion


//#region Rutas
router.post('/login', login );
router.get('', getAllUsers );
router.get('/:id',authValid, getUser );
router.post('',authValid, createUser );
router.put('/:id',authValid, updateUser );
//#endregion


//#region Exports
module.exports = router;
//#endregion