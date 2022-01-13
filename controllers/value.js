const value = require("../models/value");
const Value = require("../models/value");
const getValue = async (req, res) => {
  const value = await Value.find({});
  res.json({
    ok: true,
    value,
  });
};

const crearCotizacion = async (req, res) => {
    try {
      const value = new value(req.body);
      await value.save();
      console.log(req.body);
      res.json({
        ok: true,
        value,
      });
    } catch (error) {
        console.log(error)
        let errorMessage = 'Error en la cotizacion'
        if (error.code==11000){
            errorMessage='La cotizacion ya se registro ' 
        } 
        res.status (500) .json({
            
            ok: false,
            errorMessage
        });
    
      }
    };

    const updateValue = async (req, res) => {
        try {
          const {_id, ...data} = req.body;
          const value = await Value.findByIdAndUpdate(_id, data);
          res.json({
            ok: true,
            value
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
        crearCotizacion,
        getValue,
        updateValue,
       
      };