const Usuario = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


const getUsuarios = async (req, res) => {
  const users = await Usuario.find({});
  res.json({
    ok: true,
    users
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
    sendMail(usuario, info => {
      console.log(`Se ha enviado un correo ${info.messageId}`);
      res.send(info);
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
  const user = await Usuario.findOne({ email: body.email, active: true });

  if (user) {
    const validatePassword = await bcrypt.compare(body.password, user.password);
    if (validatePassword) {
      res.status(200).json({ user, ok: true });
    } else {
      res.status(400).json({ error: "Password invalido", ok: false });
    }
  } else {
    res.status(400).json({
      error: "Usuario inexistente o deshabilitado",
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
async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'marmolesmendoza@gmail.com',
      pass: 'Marmen08'
    }
  });

  let mailOptions = {
    from: "andresbg446@gmail.com",
    to: user.email,
    subject:  'src:  Bienvenidos a Marmoles Mendoza',
    html: `<h1>Hola ${user.name}</h1><br><h4>Gracias por unirse</h4><br><h4>Marmoles Mendoza le desea una grta bienvenida</h4>
    <br>  <img>
    src="assets/img/sede.jpg"
    alt=""
  </img>` 
  };
  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

const forgot = async (req, res) => {
  const thisUser = getUsuarios(req.body.email);
  if (thisUser) {
      const id = req.params.id;
      const request = {
          id,
          email: thisUser.email,
      };
      createResetRequest(request);
      sendResetLink(thisUser.email, id);
      res.status(200).json();
  } (error)
    let errorMessage = "Error en el servidor";

    res.status(400).json({
      ok: false,
      errorMessage,
    });
    console.log(error);
  
 
};

const reset = async (req, res) => {
  const thisRequest = getResetRequest(req.body.id);
  if (thisRequest) {
      const user = getUsuarios(thisRequest.email);
      bcrypt.hash(req.body.password, 10).then(hashed => {
          user.password = hashed;
          updateUsuarios(user);
          res.status(204).json();
      })
  } else {
      res.status(404).json();
  }
};


module.exports = {
  getUsuarios,
  crearUsuario,
  login,
  updateUsuarios,
  deleteUser,
  sendMail,
  forgot,
  reset
};
