const { Router } = require('express');
const { check } = require('express-validator');
const res = require('express/lib/response');
const { crearCategoria, obtenerCategorias,obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const {  existeCategoriaId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')


const router = Router();

/*
*{{url}}/api/categorias
*/
// Obtener todas las categorias - publico 
router.get('/', obtenerCategorias);

// Obtener una categoria por id  - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos,
], obtenerCategoria);

// Crear una nueva categoria - privado - cualquier persona con un token valido.
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    crearCategoria
 ], (req, res)=> {
    res.json('post');
});

// Actualizar privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], actualizarCategoria );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos,
    
], borrarCategoria);


module.exports = router;