const {Schema, model } =  require('mongoose');
  
const CuestionsSchema = Schema ({
    name: {
        type: String,
        require:true
    },
    
    email: {
        type: String,
        require: true
    },
  
    problem: {
        type: String,
        require: true
    },
 
});

module.exports = model('Cuestions', CuestionsSchema);