const Usuario = require ('../models/usuario');
const getUsuarios = (req, res) => {

    res.json({
        ok: true,
        usuarios: []
    });
}

const crearUsuario = async (req, res) => {

    const {nombre, email, password} = req.body;
    const usuario = new Usuario(req.body);

    await usuario.save();

    console.log(req.body);
    res.json({
        ok: true,
        usuario: usuario
    });
}

module.exports = {
    getUsuarios,
    crearUsuario
}