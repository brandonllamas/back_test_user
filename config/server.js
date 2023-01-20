//#region Imports
const express = require('express')
const cors = require('cors');
//#endregion

//#region Server
class Server {
    constructor(){
        //secreto cookie
        this.secret_cookie = "Y?%pbHp!LxN7Tdw2"
        //express inicializado
        this.app  = express();
        //puerto tomado del .env
        this.port = process.env.PORT_SERVER;
        //path de las rutas
        this.pathRoutes = "/api/v1/users/"
        //rutas
        this.middlewares()
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Para leer y parsear todo a json
        this.app.use(express.json())

        //directorio publico de la app
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.pathRoutes,require('../routes/UserRoute'))

        //ruta middleware auth
    }

  
    listen(){
        this.app.listen(this.port, () =>{
            //para saber de que puerto viene
            console.log('Server start in the port ',this.port);
        })
    }
}
//#endregion

//#region exports
module.exports = Server;
//#endregion