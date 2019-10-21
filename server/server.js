//#region Se carga el archivo de configuracion
require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//#region Importamos las rutas del usuario
app.use(require('./routes/usuario'));

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



//#region definicion de la conexion con la base de datos
mongoose.connect(process.env.URLDB,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true },
    (err) => {
        if (err)
            throw err;
        console.log("Base de datos conectada!");
    }, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto 3000 ");
})