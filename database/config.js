const mongoose = require('mongoose');

const dbconect = async () =>{
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log("database on ")    
}catch(err){
    console.log(err)
    throw new Error("error")
}
}

module.exports = {
    dbconect
}