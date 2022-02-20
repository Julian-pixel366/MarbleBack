/**
 * Ruta: /api/products
 */
 const { Router } = require('express');
 const { getProducts, createProduct, updateProduct , getImageProductCategory, deleteProduct } = require('../controllers/product.controller')
 
 const route = Router();
 
 route.get('/', getProducts );
 route.post('/', createProduct );
 route.post('/update', updateProduct );
 route.get ('/productsCategory',getImageProductCategory); 
 route.get ('/deleteProduct/:id',deleteProduct )
 module.exports = route;