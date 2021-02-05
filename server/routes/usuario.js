
const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function (req, res) {
  
    let desde = Number(req.query.desde) || 0;

    let limite = Number(req.query.limite) || 5;

    let estado = req.query.estado || true;

    Usuario.find({ estado: true}, 'role estado google nombre email img' )
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
        if ( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.countDocuments({estado}, (err, conteo)=>{
            res.json({
            ok: true,
            usuarios,
            conteo
        });
        })
        
        
    });
});
 
app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if ( err ){
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) => {
        if ( err ){
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario:usuarioDB
        });
    });
  
});

app.delete('/usuario/:id', function (req, res) {
  let id = req.params.id;
  console.log(id);

  let cambiaEstado = {
      estado: false
  };
  //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {
        if ( err ){
            res.status(400).json({
                ok: false,
                err
            });
        };

        if ( !usuarioBorrado ){
            res.status(400).json({
                ok: false,
                err: {
                    message:'Usuario no encontrado'
                }
            });
        };


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
  });

});

module.exports = app;

