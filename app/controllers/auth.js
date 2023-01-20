//#region import
const { response, request } = require('express');
const { encriptPass, validReqVar, compare, compareHash } = require('../helpers/helper');
const jswt = require('jsonwebtoken');
const UserModel = require('../../models').User
//#endregion


//#region Metodos


const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    //validamos request
    if (!validReqVar(email) || !validReqVar(password)) {
        return res.json({
            code: 500,
            msg: "request no valid"
        });
    }


    const users = await UserModel.findOne({ where: { email } });
    if (users == null) {
        return res.json({
            code:500,
            user:null,
            token:null,
            msg:"login error",
        });
    }

    if (!(await compareHash(password,users.password))) {
        return res.json({
            code:502,
            user:null,
            token:null,
            msg:"login error",
        });
    }
    // console.log(users);
    let token = await createToken(users);
    return  res.json({
        code:200,
        user:users,
        token,
        msg:"login",
    });
}

const createToken = async (user)=>{
    // console.log(process.env.PRIVATE_KEY);
    const token = await new Promise((resolve, reject) => {
        jswt.sign({user},process.env.PRIVATE_KEY,(err,token)=>{
           resolve(token);
        })
      })
    
      return token
}
//#endregion






module.exports = {
    login,
}