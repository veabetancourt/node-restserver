const { response, request } = require('express');
const bcryptjs = require('bcrypt');


const Usuario = require('../models/usuario');
const { existeEmail } = require('../helpers/db-validators');



const usuariosGet = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find (query)
            .skip( Number(desde))
            .limit( Number(limite))
    ])

    res.json({
        total, 
        usuarios
    })
}

const usuariosPut =  async (req, res) => {
    const { id }=  req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO validar contra base de datos

    if ( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto  );

    res.json({
     
        usuario
    
    })
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

   
    // Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosDelete =  async (req, res) => {

    const { id } = req.params;

    // Fisicamente lo borramos    
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json( usuario)
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}