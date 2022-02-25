const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")
const getUsuarios = (req, res) => {
  res.json({
    ok: true,
    usuarios: [],
  });
};

const crearUsuario = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const dataUser = req.body;
    dataUser.password = await bcrypt.hash(dataUser.password, salt);
    const usuario = new Usuario(dataUser);
    await usuario.save();
    console.log(req.body);
    res.json({
      ok: true,
      usuario: usuario,
    });
  } catch (error) {
    let errorMessage = 'Error en el servidor'
    if (error.code==11000){
        errorMessage='El email ya existe en la base de datos ' 
    } 
    res.status (500) .json({
        
        ok: false,
        errorMessage
    });

  }
};

const login = async (req, res) => {
  const body = req.body;
  const user = await Usuario.findOne({ email: body.email });

  if (user) {
    const validatePassword = await bcrypt.compare(body.password, user.password);
    if (validatePassword) {
      res.status(200).json({ user, ok: true });
    } else {
      res.status(400).json({ error: "Password invalido", ok: false });
    }
  } else {
    res.status(400).json({
      error: "Usuario inexistente",
      ok: false,
    });
  }
};

const updateUsuarios = async (req, res) => {
  try {
    const {_id, ...data} = req.body;
    const usuarios = await Usuario.findByIdAndUpdate(_id, data);
    res.json({
      ok: true,
      usuarios
    });
  } catch (error) {
    let errorMessage = 'Error en el servidor'

    res.status (500) .json({
        ok: false,
        errorMessage
    });
    console.log(error)
  }
};
const deleteUser = async (req, res) => {
  try {
    
    const id = req.params.id;
    await Usuario.deleteOne({
      _id: id
    }),
    res.json({
      ok: true,
      message:"Usuario  eliminado con exito",
    });
  } catch (error) {
    let errorMessage = "Error en el servidor";

    res.status(500).json({
      ok: false,
      errorMessage,
    });
    console.log(error);
  }
};
const sendMail = async (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log('Se ha envado un correo de verificación a tu email ${info.messageId}');
    res.send(info);
  });


async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    host: "andresbg446@gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: datails.email,
      password: details.password
    }


  });

  let mailOptions = {
    from: "andresbg446@gmail.com",
    to: user.email,
    subject: "Bienvenidos a marbleSystem",
    html: '<h1>Hola ${user.name}</h1><br><h4>Gracias por unirse</h4>'
  };

  let info = await transporter.sendMail(mailOptions);
  callback(info);
}
};

module.exports = {
  getUsuarios,
  crearUsuario,
  login,
  updateUsuarios,
  deleteUser,
  sendMail
  
};
