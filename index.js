
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
app.use('/api/rents', require('./routes/rents.route'));
app.use('/api/sales', require('./routes/sales.route'));
app.use('/api/products', require('./routes/products.route'));

//console.log(process.env);
//rutas


app.listen(process.env.PORT, ()=>{
    console.log('Server running', process.env.PORT);
});