
const { Router } = require ('express');
const { getSales, crearVenta, updateSales } = require('../controllers/sales')

const route = Router();

route.get('/', getSales );
route.post('/', crearVenta );
route.post('/update', updateSales );

module.exports = route;