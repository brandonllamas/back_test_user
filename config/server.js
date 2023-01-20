//#region Imports
const express = require('express')
const cors = require('cors');
const { Cookie } = require('express-session');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
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
        this.pathRoutes = "/api/v1"
        //rutas
        this.middlewares()
        this.routes();
    }

    middlewares(){

        //cookie parser
        this.app.use(cookieParser(this.secret_cookie))

        //session
        this.app.use(session({
            secret:this.secret_cookie,
            resave:true,
            saveUninitialized:true
        }))

        this.app.use(passport.initialize());
        this.app.use(passport.session())

        //CORS
        this.app.use(cors());

        //Para leer y parsear todo a json
        this.app.use(express.json())

        //directorio publico de la app
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.pathRoutes+"/users",require('../routes/users'))
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