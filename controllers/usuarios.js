const { response, request } = require('express');


const usuariosGet = (req, res) => {

    const { q, nombre, apikey } = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPut =  (req, res) => {
    const { id }=  req.params;
    res.json({
        msg: 'put API - conttrolador',
        id
    })
}

const usuariosPost =  (req, res) => {

    const {nombre, edad } = req.body;

    res.json({
        msg: 'post API - conttrolador',
        nombre, 
        edad
    })
}

const usuariosDelete =  (req, res) => {
    res.json({
        msg: 'delete API - conttrolador'
    })
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}