
const { Schema, model } = require('mongoose');

const rentSchema = Schema ({
    name: {
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
    rent: {
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

module.exports = model('rent', rentSchema);


