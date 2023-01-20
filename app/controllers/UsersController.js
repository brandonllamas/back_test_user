//#region import
const { response, request } = require('express');
const Sequelize = require('sequelize');
const { validReqVar, encriptPass } = require('../helpers/helper');
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
            code: 500,
            user: null,
            msg: "User not found",
        });
    }
    return res.json({
        code: 200,
        user: {
            id: users.id,
            document_type_id: null,
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
        msg: "Found",
    });
}


const getAllUsers = async (req = request, res = response) => {


    const users = await UserModel.findAll();
    if (users == null) {
        return res.json({
            code: 500,
            user: null,
            msg: "User not found",
        });
    }
    let userFinal = [];
    users.forEach(element => {
        userFinal.push({
            id: element.id,
            first_name: element.first_name,
            last_name: element.last_name,
            date_birth: element.date_birth,
            email: element.email,
            address: element.address,
            city_id: null,
            session_active: true
        })
    });
    return res.json({
        code: 200,
        user: userFinal,
        msg: "Found",
    });
}


const createUser = async (req = request, res = response) => {
    let { first_name, last_name, date_birth, mobile_phone, email, password, address } = req.body;

    if (!validReqVar(first_name) || !validReqVar(last_name) || !validReqVar(date_birth) || !validReqVar(mobile_phone)
        || !validReqVar(email) || !validReqVar(password) || !validReqVar(address)) {

        return res.json({
            code: 500,
            user: null,
            msg: "Request not valid"
        });

    }
    const users = await UserModel.findOne({ where: { email } });
    if (users != null) {
        return res.json({
            code: 500,
            user: null,
            msg: "Email not valid",
        });
    }
    password = await encriptPass(password);
    date_birth = new Date(date_birth)

    const newUser = await UserModel.create({
        first_name,
        last_name,
        date_birth,
        mobile_phone,
        email,
        password,
        address
    })

    return res.json({
        code: 200,
        user: newUser,
        msg: "Found",
    });
}

const updateUser = async (req = request, res = response) => {
    let { first_name, last_name, date_birth, mobile_phone, email, password, address } = req.body;
    const id = req.params.id;


    if (!validReqVar(first_name) || !validReqVar(last_name) || !validReqVar(date_birth) || !validReqVar(mobile_phone)
        || !validReqVar(email) || !validReqVar(password) || !validReqVar(address)) {

        return res.json({
            code: 500,
            user: null,
            msg: "Request not valid"
        });

    }
    const users = await UserModel.findOne({ where: { id } });
    if (users == null) {
        return res.json({
            code: 500,
            user: null,
            msg: "User not found",
        });
    }


    password = await encriptPass(password);
    date_birth = new Date(date_birth)

    try {
        const newUser = await UserModel.update({
            first_name,
            last_name,
            date_birth,
            mobile_phone,
            password,
            address
        }, {
            where: {
                id
            }
        })
        const users = await UserModel.findOne({ where: { id } });

        return res.json({
            code: 200,
            user: users,
            msg: "Found",
        });
    } catch (error) {
        return res.json({
            code: 400,
            user: null,
            msg: "User not save,email duplicaded",
        });
    }



}





module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser
}