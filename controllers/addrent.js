const Rent = require("../models/addrent");
const getRents = (req, res) => {
  res.json({
    ok: true,
    abonos: [],
  });
};

const crearAbono = async (req, res) => {
  try {
   
    const abono = new abono(dataRent);
    await abono.save();
    console.log(req.body);
    res.json({
      ok: true,
      abono: abono,
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