//#region Imports
const express = require('express')
const cors = require('cors');
const { Cookie } = require('express-session');
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
        this.pathRoutes = "/api/v1/users"
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
        this.app.use(this.pathRoutes,require('../routes/AuthRoute'))
        this.app.use(this.authValid)
        this.app.use(this.pathRoutes,require('../routes/UserRoute'))

        //ruta middleware auth
    }

    authValid(req, res, next){
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