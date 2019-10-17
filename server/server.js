//#region Se carga el archivo de configuracion
require('./config/config')

const express = require('express')
const app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//#region aqui vamos configurando los diferentes espacios de la aplicacion
//#region Metodos GET
app.get('/usuario', function (req, res) {
  res.json('Get Usuario')
})
 

//#region Metodos POST
app.post('/usuario', function (req, res) {
    //#region recuperar paramegtros [bodyParser]

    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            comentario: 'El campo es obligatorio'
        });
    }
    else {
        res.json({
            persona: body
        });
    }
})




//#region Metodos PUT
app.put('/usuario/:id', function (req, res) {
    //recupero el id del parametro
    let id = req.params.id;

    res.json({
        id:id
    })
  })


//#region Metodos DELETE
app.delete('/usuario', function (req, res) {
    res.json('DELETE Usuario')
  })

app.listen(process.env.PORT, ()=>{
    console.log("Escuchando el puerto 3000 ");
})