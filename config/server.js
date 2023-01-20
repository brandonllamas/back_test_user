//#region Imports
const express = require('express')
const cors = require('cors')
//#endregion

//#region Server
class Server {
    constructor(){
        //express inicializado
        this.app  = express();
        //puerto tomado del .env
        this.port = process.env.PORT;
        //path de las rutas
        this.pathRoutes = "/api/v1"
        //rutas
        this.routes();
    }

    middlewares(){

    }

    routes(){
        this.app.use(this.pathRoutes+"/users",require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server start in the port');
        })
    }
}
//#endregion

//#region exports
module.exports = Server;
//#endregion