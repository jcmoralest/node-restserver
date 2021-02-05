
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));
 

mongoose.connect(process.env.URLDB,
                    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
                    (err, res) => {
//strider
//5sGE78vZS4LmLNdO    
//mongodb+srv://strider:<password>@cluster0.1xupi.mongodb.net/test
if (err) throw err;
    console.log('Base de datos online')
});

app.listen(process.env.PORT,() => {
    console.log(`Escuchando por el puerto 3000`);
});