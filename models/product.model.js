const {Schema, model } =  require('mongoose');
  
const ProductSchema = Schema ({
    name: {
        type: String,
        require:true
    },
    image:{
        type:  String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    material: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },    
    color: {
        type: String,
        require: true
    },
    amount: {
        type: String,
        required: true
    }
});

module.exports = model('Product', ProductSchema);