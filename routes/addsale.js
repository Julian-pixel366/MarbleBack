
const { Router } = require ('express');
const { getSale, crearVenta } = require('../controllers/addsale')

const route = Router();

route.get('/', getSale );
route.post('/', crearVenta );

module.exports = route;