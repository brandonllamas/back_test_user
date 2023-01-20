//#region import
const { response, request } = require('express');
const { validReqVar } = require('../helpers/helper');
const UserModel = require('../../models').User
//#endregion


const getUser = async (req = request, res = response) => {
    const id = req.params.id;

    if (!validReqVar(id)) {
        return res.json({
            code: 500,
            usr: [],
            msg: "Error"
        })
    }
    const users = await UserModel.findOne({ where: { id } });
    if (users == null) {
        return res.json({
            code:500,
            user:null,
            msg:"User not found",
        });
    }
    return res.json({
        code:200,
        user:{
            id:users.id,
            document_type_id:null,
            document_type_id: null,
            document_number: null,
            first_name: users.first_name,
            last_name: users.last_name,
            date_birth: users.date_birth,
            mobile_phone: users.mobile_phone,
            email: users.email,
            address: users.address,
            city_id: null,
            session_active: true
        },
        msg:"Found",
    });
}







module.exports = {
    getUser,
}