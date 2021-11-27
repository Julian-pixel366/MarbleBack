
const { Router } = require ('express');
const { getRents,  crearAbono } = require('../controllers/addrent');


const route = Router();

route.get('/', getRents );
route.post('/', crearAbono );


module.exports = route;