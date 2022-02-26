const {Schema, model } =  require('mongoose');
  

const rolesValidos = {
    values: ["ADMIN", "CLIENT"],
    message: '{VALUE} no es un role válido'
}
const UsuarioSchema = Schema ({
    name: {
        type: String,
        require:true
    },
    email:{
        type:  String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        
    },

    document: {
        type: String,
        require: true
    },

    address: {
        type: String,
        
    },   
    
    city: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'CLIENT',
        required: [true],
        enum: rolesValidos,
    },
    active: {
        type: Boolean,
        default: true,
        required: [true]
    }
});





module.exports = model('Usuario', UsuarioSchema);