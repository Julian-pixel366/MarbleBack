const { Router } = require ('express');
const { getAllValues,  crearCotizacion, valueByUser, deleteValue, updateValue } = require('../controllers/value');


const route = Router();

route.get('/', getAllValues );
route.post('/', crearCotizacion );
route.get('/valueByUser', valueByUser );
route.get ('/deleteValue/:id',deleteValue );
route.post('/updateValue', updateValue );


module.exports = route; 