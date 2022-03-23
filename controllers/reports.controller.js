const Products = require("../models/product.model");
const Sale = require("../models/sale");
const Usuario = require("../models/user");
const Value = require("../models/value");
const getDataReports = async (req, res) => {
  try {
	const responde = {};
	const dataProducts = [];
	const contadorCocinas = await Products.count({ category: "Cocinas" });
	dataProducts.push({ category: "cocinas", count: contadorCocinas });
	const contadorMesones = await Products.count({ category: "Mesones" });
	dataProducts.push({ category: "mesones", count: contadorMesones });
	const contadorBanos = await Products.count({ category: "Baños" });
	dataProducts.push({ category: "banos", count: contadorBanos });

	responde["products"] = {
	  list: dataProducts,
	};

	const dataSale = [];

	const contadorVentaCocinas = await Sale.count({ product: "Cocina" });
	dataSale.push({ product: "cocinas", count: contadorVentaCocinas });
	const contadorVentaMesones = await Sale.count({ product: "Meson" });
	dataSale.push({ product: "mesones", count: contadorVentaMesones });
	const contadorVentaBanos = await Sale.count({ product: "Baño" });
	dataSale.push({ product: "banos", count: contadorVentaBanos });    

	const totalSales = await Sale.aggregate([
		{
			$group: {
				_id: '$product',
				total: {$sum: { $toDouble: '$price' }}
			}
		}
	]);
	
	responde["sales"] = {
		list: dataSale,
		total: totalSales
	};

	const countUsers = await Usuario.count({});
	responde['users'] = {
		totalCount: countUsers
	}
	const countValue = await Value.count({});
	responde['value'] = {
		totalCount: countValue
	}
	res.json(responde);

  } catch (error) {
	let errorMessage = "Error en el servidor";

	res.status(500).json({
	  ok: false,
	  errorMessage,
	});
	console.log(error);
  }
};

const getDataReportsByUser = async (req, res) => {
	try {
		const email = req.query.email;	
	  const responde = {};
	 
	  const dataSale = [];
		
	  const salesByuser = await Sale.find({
		email,
	  });
	  
	  const contadorVentaCocinas = await Sale.count({ product: "Cocina" });
	  dataSale.push({  product: "cocinas", count: contadorVentaCocinas   });
	  const contadorVentaMesones = await Sale.count({ product: "meson" });
	  dataSale.push({ product: "mesones", count: contadorVentaMesones });
	  const contadorVentaBanos = await Sale.count({ product: "Baño" });
	  dataSale.push({ product: "banos", count: contadorVentaBanos });    
  
	  const totalSales = await Sale.aggregate([
		  {
			  $group: {
				  _id: '$product',
				  total: {$sum: { $toDouble: '$price' }}
			  }
		  }
	  ]);
	  
	  responde["sales"]  = {
		  list: dataSale,
		  total: totalSales,
		  email
	  };
  
	  const countValue = await Value.count({});
	  responde['value'] = {
		  totalCount: countValue
	  }
	  res.json(responde);
  
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
  getDataReports,
  getDataReportsByUser,
};
