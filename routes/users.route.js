/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, crearUsuario,login, updateUsuarios,
     deleteUser, sendMail/* , forgotPassword, newPassword  */ } = require('../controllers/users')

const route = Router();

route.get('/', getUsuarios );
route.post('/', crearUsuario );
route.post('/login', login );
route.post('/update', updateUsuarios );
route.get ('/deleteUsers/:id',deleteUser );
route.post('/email', sendMail )
/* route.put ('/forgot-password', forgotPassword )
route.put ('/new-password', newPassword ) */
module.exports = route;