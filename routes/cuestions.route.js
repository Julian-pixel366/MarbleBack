
const { Router } = require ('express');
const { getCuestions,  newCuestions,  deleteCuestion } = require('../controllers/rents');


const route = Router();

route.get('/', getCuestions );

route.post('/', newCuestions );

route.get ('/deleteCuestion/:id',deleteCuestion )



module.exports = route;