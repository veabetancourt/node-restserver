const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port =  process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarBD();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación

        this.routes();
    }

    async conectarBD() {
        await dbConnection();
    }

    middlewares() {
        //CORS 
        this.app.use(cors());
        // Lectura y paser del body
        this.app.use( express.json() );
        // Directorio púbilico
        this.app.use( express.static('public') );
    }

routes() {
    
    this.app.use(this.usuariosPath, require('../routes/usuarios'));

}

listen() {
    this.app.listen( this.port,  () => {
        console.log(`Servidor corriendo en puerto, ${this.port}`);
    });
}

}

module.exports = Server;