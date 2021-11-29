const Sale = require("../models/sale");
const getSales = async (req, res) => {
  const ventas = await Sale.find({});
  res.json({
    ok: true,
    ventas: ventas,
  });
};

const crearVenta = async (req, res) => {
  try {
    const sale = new Sale(dataUser);
    await sale.save();
    console.log(req.body);
    res.json({
      ok: true,
      sale,
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
  getSales,
 
};