const { Router } = require ('express');
const { getValue,  crearCotizacion, valueByUser, deleteValue } = require('../controllers/value');


const route = Router();

route.get('/', getValue );
route.post('/', crearCotizacion );
route.get('/valueByUser', valueByUser );
route.get ('/deleteValue/:id',deleteValue )


module.exports = route;