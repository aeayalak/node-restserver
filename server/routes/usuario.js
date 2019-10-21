const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const _ = require('underscore');

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//#region aqui vamos configurando los diferentes espacios de la aplicacion

//#region Metodos GET
app.get('/usuario', function (req, res) {

    //#region Parametros opciones de la funcion
    //en este caso tenemos el desde y el limite de una consulta basica
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //se utiliza un metodo find de busqueda al cual le pasamos los parametros declarados arriba
    Usuario.find({estado:true},'nombre email rol estado google imagen')//aca estamos filtrando los datos a mostrar
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {//respuesta ante una falla de la operacion
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({estado:true},(err,conteo)=>{
                res.json({
                    ok: true,
                    cuantos: "numero total de registros " +  conteo,
                    usuarios
                })
            });
        })

    //res.json('Get Usuario')
})


//#region Metodos POST
app.post('/usuario', function (req, res) {
    //#region recuperar paramegtros [bodyParser]

    let body = req.body;

    //#region Cargo el usuario local con la info que proviene del body en el metodo post
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //#region Como la guardamos, usando el save de mongoose
    usuario.save((err, usuarioDB) => {
        if (err) {//respuesta ante una falla de la operacion
            res.status(400).json({
                ok: false,
                err
            });
        }
        usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

//#region Metodos PUT
app.put('/usuario/:id', function (req, res) {
    //recupero el id del parametro
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //con el _pick estoy realizando una validacion de 'underscore'
    // ['nombre', 'email', 'img', 'role', 'estado']; // si se puede actualizar
    //#region para buscar y guardar o actualizar
    //{new:true, runValidators:true} con las opciones de actualizacion del objeto 
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {//respuesta ante una falla de la operacion
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            usuario: usuarioDB
        });

    });
});


//#region Metodos DELETE
//#region //Borrado fisico /
// app.delete('/usuario/:id', function (req, res) {
//     //Recupero el id del elemento a borrar
//     let id = req.params.id;
//     //lo recupero y lo borro fisicamente de la base
//     Usuario.findByIdAndRemove(id, (err,usuarioBorrado)=>{
//         if (err) { //respuesta ante una falla de la operacion
//             res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }
//         //realizo una validacion por si se presiona varias veces el boton de borrar
//         if(!usuarioBorrado){
//             res.status(400).json({
//                 ok: false,
//                 error:{
//                     mensaje:"Usuario no econtrado"
//                 }
//             });
//         }
//         //respuesta del borrado
//         res.json({
//             ok:true,
//             usuario:usuarioBorrado
//         });
        
//     });
// });



app.delete('/usuario/:id', function (req, res) {
    //Recupero el id del elemento a borrar
    let id = req.params.id;
    let estadoCambiado ={
        estado:false
    } ;
    //lo recupero y lo borro fisicamente de la base
    Usuario.findByIdAndUpdate(id, estadoCambiado,{ new: true}, (err,usuarioBorrado)=>{
        if (err) { //respuesta ante una falla de la operacion
            res.status(400).json({
                ok: false,
                err
            });
        }
        //realizo una validacion por si se presiona varias veces el boton de borrar
        if(!usuarioBorrado){
            res.status(400).json({
                ok: false,
                error:{
                    mensaje:"Usuario no econtrado"
                }
            });
        }
        //respuesta del borrado
        res.json({
            ok:true,
            usuario:usuarioBorrado
        });
        
    });
});



module.exports = app;