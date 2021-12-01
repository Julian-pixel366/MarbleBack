/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, crearUsuario,login, updateUsuarios } = require('../controllers/usuarios')

const route = Router();

route.get('/', getUsuarios );
route.post('/', crearUsuario );
route.post('/login', login );
route.post('/update', updateUsuarios );

module.exports = route;