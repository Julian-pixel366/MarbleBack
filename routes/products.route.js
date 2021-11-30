/**
 * Ruta: /api/products
 */
 const { Router } = require('express');
 const { getProducts, createProduct, updateProduct } = require('../controllers/product.controller')
 
 const route = Router();
 
 route.get('/', getProducts );
 route.post('/', createProduct );
 route.post('/update', updateProduct );
  
 module.exports = route;