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
  }
  res.status(200).json();
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


/* const forgotPassword = async (req,res) =>{
  const {email} = req.body;
  if (!(email)){
    return res.status(400).json({message:'emaiñ no encontrado'});
  }

  const message = 'Se ha enviado un correo con link de activacion ';
  let verificationLink;
  let emailStatus= 'Ok';

  const userRepository = getRepository(Users);

  let user = Users;

  try {
    user = await userRepository.findOneOrFail({where: {email}})
    const token = jwt.sign ({usserId: user.id, email: user.email },config.jwtSecret, {expiresIn: '10m'} );
    verificationLink = `http://localhost:3000/new-password/${token}`;
    user.resetToken = token;
  } catch (error) {
    return res.json({message});
  }

  /* Send Email */
   
 /*  try {
    
  } catch (error) {
    emailStatus = error;
    return res.status(400).json ({message: 'Something goes wrong!'});

  }

  try {
    await userRepository.save(user);
    
  } catch (error) {
    emailStatus = error;
    return res.status(400).json ({message: 'Something goes wrong!'});
    
  }

  res.json ({message, info: emailStatus});



}

const newPassword = async (req, res ) => {
  
  const {newPassword} = req.body;
  const resetToken = req.headers.reset as  string;

  if (!(resetToken && newPassword)){
    res.status(400).json({message: 'todos los campos son requeridos '});

  }

  const userRepository = getRepository(Users);
  let jwtPayload;
  let user =Users;

  try {
    jwtPayload = jwt.verify(resetToken,config.jwtSecretReset);
    user = await userRepository.findOneOrFail({where: {resetToken}});
  } catch (error) {
    return res.status(401).json({ message : 'something goes grong'});
    
  }

  user.password = newPassword;
  const validationsOps = {validationError: {target: false, value: false}};
  const errors = await validate (user, validationsOps);

  if  (errors.length > 0) {
    return res.status(400).json (errors);

  }

  try {
    user.hashPassword();
    await userRepository.save(user);
  } catch (error) {

    return res.status(401).json({ message : 'something goes grong'});
  }
  res.json ({message: 'Password changed' });
}
 */ 

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
