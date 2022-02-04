
const { Router } = require ('express');
const { getSales, crearVenta, updateSales , salesByUser } = require('../controllers/sales')

const route = Router();

route.get('/', getSales );
route.get('/salesByUser', salesByUser );
route.post('/', crearVenta );
route.post('/update', updateSales );

module.exports = route;