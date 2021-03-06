const Rent = require("../models/rent");
const getRents = async (req, res) => {
  const rents = await Rent.find({});
  res.json({
    ok: true,
    rents
  });
};

const crearAbono = async (req, res) => {
  try {
    
    const dataRent = req.body;

    const rents = new Rent(dataRent);
    await rents.save();
    console.log(req.body);
    res.json({
      ok: true,
      rents
    });
  } catch (error) {
    let errorMessage = 'Error en el abono'
    if (error.code==11000){
        errorMessage='El abono ya se registro ' 
    } 
    res.status (500) .json({
        
        ok: false,
        errorMessage
    });

  }
};

const updateRents = async (req, res) => {
  try {
    const {_id, ...data} = req.body;
    const rents = await Rent.findByIdAndUpdate(_id, data);
    res.json({
      ok: true,
      rents
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
const rentsByUser = async (req, res) => {
  try {
    const email = req.query.email;
    const rents = await Rent.find({
      email,
    });
    res.json({
      ok: true,
      rents,
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
const deleteRent = async (req, res) => {
  try {
    
    const id = req.params.id;
    await Rent.deleteOne({
      _id: id
    }),
    res.json({
      ok: true,
      message:"Abono  eliminado con exito",
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




module.exports = {
  getRents,
  crearAbono,
  updateRents,
  rentsByUser,
 deleteRent
};