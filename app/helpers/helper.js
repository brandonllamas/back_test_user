//#region Imports
const bcrypt = require('bcrypt');
//#endregion

//#region  metodos
const saltRounds = 10;

const encriptPass = async (myPlaintextPassword) => {
    
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword

}
const compareHash = async (myPlaintextPassword,hash) => {
    
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
             resolve(result)
        });
    })
  
    return hashedPassword
  
  }

const validReqVar = (text)=>{
    if (text == "") {
        return false;
    }

    if (text == null) {
        return false;    
    }

    if (text == undefined) {
        return false;
    }
    return true;
}
//#endregion

//#region expors
module.exports = {
    encriptPass,
    validReqVar,
    compareHash
}
//#endregion