const express = require('express')
const app = express()
require('./config/config')

//POR CADA PETICION HTTP QUE HAGAMOS, EJECUTARA EL BODYPARSER.
const bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
// cada petición que hagamos va a ejecutar estas líneas(app.use....)
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.get('/usuario', function (req, res) {
  // res.send('Hello World')
  // el tipo de respuesta lo devuelve en json
  //Content-Type:application/json; charset=utf-8
  //sin usamos el res.send, Content-Type:text/html; charset=utf-8
  res.json('get Usuario')
})

app.post('/usuario', function (req, res) {
  console.log('req', req);
  let body = req.body;

  if (!body.nombre) {
    res.status(400).json({
      ok: false,
      mensaje: 'El atributo nombre es necesario'
    })
  } else {
    res.json({
      //si no se define parametro, visualiza body por defecto
      persona: body
    })
  }


})

app.put('/usuario/:id', function (req, res) {
  let id = req.params.id;
  res.json({
    id
  })
})

app.delete('/usuario', function (req, res) {
  res.json('delete Usuario')
})

app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`)
})