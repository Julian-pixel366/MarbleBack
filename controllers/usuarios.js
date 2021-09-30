const Usuario = require ('../models/usuario');
const bcrypt = require("bcrypt");
const getUsuarios = (req, res) => {
  
    res.json({
        ok: true,
        usuarios: []
    });
}

const crearUsuario = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const {nombre, email, password} = req.body;
    const dataUser = req.body;
    dataUser.password = await bcrypt.hash(dataUser.password, salt);
    const usuario = new Usuario(dataUser);


    await usuario.save();

    console.log(req.body);
    res.json({
        ok: true,
        usuario: usuario
    });
}

const login = async (req,res)=>{
    const body = req.body;
    const user = await Usuario.findOne({ email:body.email });

    if(user){
        const validatePassword= await bcrypt.compare(body.password,user.password)
        if(validatePassword){
            res.status(200).json({ message:"password valido" })
        }else{
            res.status(400).json({ error: "password invalido" })
        }
    }else{
        res.status(400).json({
            error: " usuario inexistente"
        })

    }


}

module.exports = {
    getUsuarios,
    crearUsuario,
    login
}