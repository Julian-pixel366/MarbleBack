const Products = require("../models/product.model");


const getProducts = async (req, res) => {
  const products = await Products.find({});
  res.json({
    ok: true,
    products
  });
};

const createProduct = async (req, res) => {
  try {    
    const product = new Products(req.body);
    await product.save();
    res.json({
      ok: true,
      product
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
const updateProduct = async (req, res) => {
  try {
    const {_id, ...data} = req.body;
    const product = await Products.findByIdAndUpdate(_id, data);
    res.json({
      ok: true,
      product
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
  getProducts,
  createProduct,
  updateProduct
};
