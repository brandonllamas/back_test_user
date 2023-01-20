//#region import
const { response, request } = require('express');
const { encriptPass, validReqVar } = require('../helpers/helper');
//#endregion


//#region Metodos
const login =async (req = request, res = response) => {
    const { email, password } = req.body;
    //validamos request
    if (!validReqVar(email) || !validReqVar(password )) {
        return res.json({
            code:500,
            msg:"request no valid"
        });
    }

   console.log(await encriptPass(password));
    res.json({
        email, password
    });
}
//#endregion






module.exports = {
    login,
}