const {Schema, model } =  require('mongoose');
  


const UsuarioSchema = Schema ({
    nombre: {
        type: String,
       
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
    telefono: {
        type: String,
        
    }
});





module.exports = model('Usuario', UsuarioSchema);