
const express = require('express');
require('dotenv').config();
var cors = require('cors');
const {dbconect} = require('./database/config')
const app = express();
// configurar cors
app.use(cors());
app.use(express.json());
//base
dbconect();

app.use('/api/usuarios', require('./routes/users.route'));
app.use('/api/addRent', require('./routes/rents.route'));
app.use('/api/addsale', require('./routes/sales.route'));

//console.log(process.env);
//rutas


app.listen(process.env.PORT, ()=>{
    console.log('Server running', process.env.PORT);
});