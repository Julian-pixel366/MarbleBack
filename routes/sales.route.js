
const { Router } = require ('express');
const { getSales, crearVenta } = require('../controllers/sales')

const route = Router();

route.get('/', getSales );
route.post('/', crearVenta );

module.exports = route;