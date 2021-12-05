const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares')

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');




const { usuariosGet,
        usuariosPost,
        usuariosDelete, 
        usuariosPut } = require('../controllers/usuarios');

 
const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);


router.post('/',[
    check('nombre', 'El es obligatorio').not().isEmpty(),
    check('password', 'El password dbe de ser más de 6 letras').isLength({ min:6 }),
    check('correo').custom( existeEmail ),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );




module.exports = router;