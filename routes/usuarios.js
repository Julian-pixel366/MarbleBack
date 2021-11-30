/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, crearUsuario,login, updateUsuiarios } = require('../controllers/usuarios')

const route = Router();

route.get('/', getUsuarios );
route.post('/', crearUsuario );
route.post('/login', login );
route.post('/update', updateUsuiarios );

module.exports = route;