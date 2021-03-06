const Value = require("../models/value");
const getAllValues = async (req, res) => {
  const value = await Value.find({});
  res.json({
    ok: true,
    value,
  });
};

const crearCotizacion = async (req, res) => {
    try {
      const value = new Value(req.body);
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

    const valueByUser = async (req, res) => {
      try {
        const email = req.query.email;
        const value = await Value.find({
          email,
        });
        res.json({
          ok: true,
          value,
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
    const deleteValue = async (req, res) => {
      try {
        
        const id = req.params.id;
        await Value.deleteOne({
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

    const updateValue = async (req, res) => {
      try {
        const {_id, ...data} = req.body;
        const value = await Rent.findByIdAndUpdate(_id, data);
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
        
        
        getAllValues,
        crearCotizacion,
        valueByUser,
        deleteValue,
        updateValue
       
      };