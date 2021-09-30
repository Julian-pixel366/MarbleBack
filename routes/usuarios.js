/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, crearUsuario,login } = require('../controllers/usuarios')

const route = Router();

route.get('/', getUsuarios );
route.post('/', crearUsuario );
route.post('/login', login )

module.exports = route;