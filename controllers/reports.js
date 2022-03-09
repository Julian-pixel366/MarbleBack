    
    /* counts products
 */    
    const dataProducts = [];
    
     const contadorCocinas = await Products.count({category: 'cocinas'});
     dataProducts.push({category: 'cocinas', count: contadorCocinas});
     const contadorMesones =  await Products.count({category: 'mesones'});
     dataProducts.push({category: 'mesones', count: contadorMesones});
     const contadorBanos = await Products.count({category: 'banos'});
     dataProducts.push({category: 'banos', count: contadorBanos});

     /* counts Sales */

    const dataSale = [];

     const contadorVentaCocinas = await Sale.count({product: 'cocinas'});
     dataSale.push({product: 'cocinas', count: contadorCocinas});
     const contadorVentaMesones =  await Sale.count({product: 'mesones'});
     dataSale.push({product: 'mesones', count: contadorMesones});
     const contadorVentaBanos = await Sale.count({product: 'banos'});
     dataSale.push({product: 'banos', count: contadorBanos});

     /* counts rent */

    const datarent = [];

     const contadorrent = await rent.count({});
     datarent.push({count: contadorrent});

     /* counts value */

    const datavalue = [];

     const contadorvalue = await rent.count({});
     datarent.push({count: contadorvalue});
     
