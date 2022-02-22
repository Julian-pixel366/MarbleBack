
const { Router } = require ('express');
const { getRents,  crearAbono, updateRents, rentsByUser, deleteRent } = require('../controllers/rents');


const route = Router();

route.get('/', getRents );
route.get('/rentsByUser', rentsByUser );
route.post('/', crearAbono );
route.post('/update', updateRents );
route.get ('/deleteRent/:id',deleteRent )



module.exports = route;