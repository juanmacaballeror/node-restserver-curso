const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
//estándar de llamarse asi
const _ = require('underscore');
//estándar de empezar con mayúsculas
const Usuario = require('../models/usuarios');
//const usuarios = require('../models/usuarios');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')


app.get('/usuario', verificaToken, (req, res) => {

  let desde = req.query.desde || 0;
  desde = Number(desde)

  let limite = req.query.limite || 5;
  limite = Number(limite);

  //aqui le indicamos que campos quiero que me devuelva en la query

  let filtrado = {
    estado: true
  }
  Usuario.find({ estado: true }, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      Usuario.count(filtrado, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        });

      })


    });


})
//si queremos que la peticion ejecute 2 middleware, se inyectan con [] sino entre ,
app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {

  const { password, nombre, email, role } = req.body;

  //bcrypt.hashSync añade 10 caracteres mas a la password y lo encripta
  let usuarioSchema = new Usuario({
    nombre: nombre,
    email: email,
    password: bcrypt.hashSync(password, 10),
    role: role
  });

  //.save(palabra reservada de mongoose) guarda en la BBDD
  //err, devuelve el error
  //usuarioDB, el usuario que grabo en mongoDB

  usuarioSchema.save((err, usuarioDB) => {
    // console.log('err', err);
    if (err) {
      res.status(400).json({
        ok: false,
        err
      })
    }
    //esto no se puede hacer, falla. Ver en models/usuarios el metodo del Schema.methods.toJSON como hace el tratamiento
    //delete usuarioDB.password;

    res.json({
      ok: true,
      usuario: usuarioDB
    })

  })

})
//si queremos que la peticion ejecute 2 middleware, se inyectan con [] sino entre ,
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
  let id = req.params.id;
  //let body = req.body;

  //con el plugin underscore le estamos diciendo que campos queremos que se actualicen, el resto del esquema no se actualizará.
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  // el tercer parametro de mongoose es options que tiene varios atributos:
  // un atributo que es new, que devuelve los datos del nuevo objeto
  // otro atributo es runValidators, si es true, valida los datos vs el esquema
  //en caso de duda ver la info de findByAndUpdate de mongoose
  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      usuario: usuarioDB
    })
  })
})

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
  let id = req.params.id;
  let cambiaEstado = {
    estado: false
  }
  //esto haria una baja fisica
  //usuarios.findByIdAndRemove(id, (err, usuarioBorrado) => {
  // hacemos una baja logica
  Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err
      })
    }
    if (!usuarioBorrado) {
      res.status(400).json({
        ok: false,
        err: {
          message: 'usuario no encontrado'
        }
      })
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado
    })
  })
})

module.exports = app;