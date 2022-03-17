
const {Schema, model } = require('mongoose');

const SaleSchema = Schema ({
    name: {
        type: String,
        require:true
    },
    nameproduct: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    document: {
        type: String,
        require: true
    },
    price: {
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
    }    
});

module.exports = model('Sale', SaleSchema);