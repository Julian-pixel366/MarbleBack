const { Router } = require('express');
const { getAddUser, addUser,adduser } = require('../controllers/adduser')

const route = Router();

route.get('/', getAddUser );
route.post('/', addUser );
route.post('/adduser', adduser )

module.exports = route;