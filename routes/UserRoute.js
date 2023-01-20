//#region Imports
const { Router } = require('express');
const { login } = require('../app/controllers/auth');
const { getUser } = require('../app/controllers/UsersController');

const router  = Router()
//#endregion



//#region Rutas


router.get('/:id', getUser );

//#endregion


//#region Exports
module.exports = router;
//#endregion