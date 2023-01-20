//#region Imports
const { Router } = require('express');
const { login } = require('../app/controllers/auth');

const router  = Router()
//#endregion



//#region Rutas
router.post('/login', login );



//#endregion


//#region Exports
module.exports = router;
//#endregion