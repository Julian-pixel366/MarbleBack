
const { Router } = require ('express');
const { getSales, crearVenta, updateSales , salesByUser, deleteSale } = require('../controllers/sales')

const route = Router();

route.get('/', getSales );
route.get('/salesByUser', salesByUser );
route.post('/', crearVenta );
route.post('/update', updateSales );
route.get ('/deleteSale/:id',deleteSale )

module.exports = route;