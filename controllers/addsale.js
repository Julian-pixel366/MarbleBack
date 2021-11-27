const Rent = require("../models/addsale");
const getSale = (req, res) => {
  res.json({
    ok: true,
    ventas: [],
  });
};

const crearVenta = async (req, res) => {
  try {
   
    const venta = new venta(dataRent);
    await venta.save();
    console.log(req.body);
    res.json({
      ok: true,
      venta: venta,
    });
  } catch (error) {
    let errorMessage = 'Error en la venta'
    if (error.code==11000){
        errorMessage='La venta ya se registro ' 
    } 
    res.status (500) .json({
        
        ok: false,
        errorMessage
    });

  }
};



module.exports = {
  crearVenta,
  getSale,
 
};