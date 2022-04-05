const Cuestions = require("../models/rent");
const getCuestions = async (req, res) => {
  const cuestions = await Rent.find({});
  res.json({
    ok: true,
    cuestions
  });
};

const newCuestions = async (req, res) => {
  try {
    
    const dataRent = req.body;

    const cuestions = new Rent(dataRent);
    await cuestions.save();
    console.log(req.body);
    res.json({
      ok: true,
      cuestions
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


const deleteCuestion = async (req, res) => {
  try {
    
    const id = req.params.id;
    await Cuestions.deleteOne({
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
  getCuestions,
  newCuestions,
 deleteCuestion
};