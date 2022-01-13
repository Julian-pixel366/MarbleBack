const { Router } = require ('express');
const { getValue,  crearCotizacion, updateValue } = require('../controllers/value');


const route = Router();

route.get('/', getValue );
route.post('/', crearCotizacion );
route.post('/update', updateValue );


module.exports = route;