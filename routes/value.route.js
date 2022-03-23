const { Router } = require ('express');
const { getAllValues,  crearCotizacion, valueByUser, deleteValue } = require('../controllers/value');


const route = Router();

route.get('/', getAllValues );
route.post('/', crearCotizacion );
route.get('/valueByUser', valueByUser );
route.get ('/deleteValue/:id',deleteValue )


module.exports = route;