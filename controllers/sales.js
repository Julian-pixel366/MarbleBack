const req = require("express/lib/request");
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
    const newSale = new Date();
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

const salesByUser = async (req, res) => {
  try {
    const email = req.query.email;
    const sales = await Sale.find({
      email,
    });
    res.json({
      ok: true,
      sales,
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
const deleteSale = async (req, res) => {
  try {
    
    const id = req.params.id;
    await Sale.deleteOne({
      _id: id
    }),
    res.json({
      ok: true,
      message:"Venta  eliminado con exito",
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
  crearVenta,
  getSales,
  updateSales,
  salesByUser,
  deleteSale,

 
};