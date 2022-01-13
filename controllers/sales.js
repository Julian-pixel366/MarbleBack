const Sale = require("../models/sale");
const getSales = async (req, res) => {
  const sales = await Sale.find({});
  res.json({
    ok: true,
    sales,
  });
};

const crearVenta = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    console.log(req.body);
    res.json({
      ok: true,
      sale,
    });
  } catch (error) {
    console.log(error)
    let errorMessage = 'Error en la vent'
    if (error.code==11000){
        errorMessage='La venta ya se registro ' 
    } 
    res.status (500) .json({
        
        ok: false,
        errorMessage
    });

  }
};

const updateSales = async (req, res) => {
  try {
    const {_id, ...data} = req.body;
    const sales = await Sale.findByIdAndUpdate(_id, data);
    res.json({
      ok: true,
      sale
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



module.exports = {
  crearVenta,
  getSales,
  updateSales,
 
};