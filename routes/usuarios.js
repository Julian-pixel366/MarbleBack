/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios')

const route = Router();

route.get('/', getUsuarios );
route.post('/', crearUsuario );

module.exports = route;