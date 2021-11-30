
const { Router } = require ('express');
const { getRents,  crearAbono, updateRents } = require('../controllers/rents');


const route = Router();

route.get('/', getRents );
route.post('/', crearAbono );
route.post('/update', updateRents );


module.exports = route;