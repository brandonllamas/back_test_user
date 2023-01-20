//#region Imports
const Server = require('./config/server');
require('dotenv').config()
//#endregion

const server = new Server();

server.listen()