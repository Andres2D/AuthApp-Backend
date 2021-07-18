const mongoose = require("mongoose");

const dbConnection = async() => {
    try{

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('data base online');

    }catch(error){
        console.log(error);
        throw new Error('Error on start the DB');
    }
}

module.exports = {
    dbConnection
}