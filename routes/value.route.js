const { Router } = require ('express');
const { getValue,  crearCotizacion, valueByUser } = require('../controllers/value');


const route = Router();

route.get('/', getValue );
route.post('/', crearCotizacion );
route.get('/valueByUser', valueByUser );


module.exports = route;