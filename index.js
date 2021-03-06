
const express = require('express');
require('dotenv').config();
const path = require('path');
var cors = require('cors');
const {dbconect} = require('./database/config')
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// configurar cors
app.use(cors());
app.use(express.json());
//base
dbconect();

app.use(express.static('public'))
app.use('/api/users', require('./routes/users.route'));
app.use('/api/rents', require('./routes/rents.route'));
app.use('/api/sales', require('./routes/sales.route'));
app.use('/api/products', require('./routes/products.route'));
app.use('/api/value', require('./routes/value.route'));
app.use('/api/reports', require('./routes/reports.route'));
app.use('/api/password-reset', require("./routes/passwordReset"));

//console.log(process.env);
//rutas
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, ()=>{
    console.log('Server running', process.env.PORT);
});
