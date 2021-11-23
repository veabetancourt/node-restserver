const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
 
        console.log('Conectado a la base de datos');
    } catch (error) {
        throw new Error('Error al conectase a la base de datos');
    }
}

module.exports = {
    dbConnection
}