/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, crearUsuario,login, updateUsuarios , deleteUser } = require('../controllers/usuarios')

const route = Router();

route.get('/', getUsuarios );
route.post('/', crearUsuario );
route.post('/login', login );
route.post('/update', updateUsuarios );
route.get ('/deleteUsers/:id',deleteUser )

module.exports = route;