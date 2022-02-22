const { Schema, model } = require('mongoose');

const valueSchema = Schema ({
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    addres: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    material: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true 
    },
    shipped:{
        type: String, 
    }
});

module.exports = model('value', valueSchema);