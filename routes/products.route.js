/**
 * Ruta: /api/products
 */
 const { Router } = require('express');
 const { getProducts, createProduct, updateProduct , getImageProductCategory } = require('../controllers/product.controller')
 
 const route = Router();
 
 route.get('/', getProducts );
 route.post('/', createProduct );
 route.post('/update', updateProduct );
 route.get ('/productsCategory',getImageProductCategory); 
 module.exports = route;