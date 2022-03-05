const Products = require("../models/product.model");

const getProducts = async (req, res) => {
  const products = await Products.find({});
  res.json({
    ok: true,
    products,
  });
};

const createProduct = async (req, res) => {
  try {
    const product = new Products(req.body);
    await product.save();
    res.json({
      ok: true,
      product,
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


const updateProduct = async (req, res) => {
  try {
    const { _id, ...data } = req.body;
    const product = await Products.findByIdAndUpdate(_id, data);
    res.json({
      ok: true,
      product,
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

const getImageProductCategory = async (req, res) => {
  try {
    const category = req.query.category;
    // const data = [];
    const productsCategory = await Products.find({
      category,
      active: true
    });
    // const contadorCocinas = await Products.count({category: 'cocinas'});
    // data.push({category: 'cocinas', count: contadorCocinas});
    // const contadorMesones =  await Products.count({category: 'mesones'});
    // data.push({category: 'mesones', count: contadorMesones});
    // const contadorBanos = await Products.count({category: 'banos'});
    // data.push({category: 'banos', count: contadorBanos});

    res.json({
      ok: true,
      productsCategory,
      // data: data
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

const deleteProduct = async (req, res) => {
  try {
    
    const id = req.params.id;
    await Products.deleteOne({
      _id: id
    }),
    res.json({
      ok: true,
      message:"producto eliminado con exito",
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
  getProducts,
  createProduct,
  updateProduct,
  getImageProductCategory,
  deleteProduct,
  
}  ;
