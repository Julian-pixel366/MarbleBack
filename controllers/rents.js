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

    const rent = new Rent(dataRent);
    await rent.save();
    console.log(req.body);
    res.json({
      ok: true,
      rent
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



module.exports = {
  getRents,
  crearAbono,
 
};