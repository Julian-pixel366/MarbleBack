const AddUser = require ('../models/adduser');
const bcrypt = require("bcrypt");
const getAddUsers = (req, res) => {
  
    res.json({
        ok: true,
        usuarios: []
    });
}

const newUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const dataUser = req.body;
    dataUser.password = await bcrypt.hash(dataUser.password, salt);
    const user = new AddUser(dataUser);
    await user.save();
    console.log(req.body);
    res.json({
        ok: true,
        usuario: usuario
    });
}



module.exports = {
    getAddUsers,
    newUser,
    
}