const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('./config/config')


//POR CADA PETICION HTTP QUE HAGAMOS, EJECUTARA EL BODYPARSER.
const bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
// cada petición que hagamos va a ejecutar estas líneas(app.use....)
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Configuracion global de rutas
app.use(require('./routes/index'));

//conectarse a la bbdd
mongoose.connect(process.env.URLDB,
  //configuracion conexion, si se quita da un warning  
  { useNewUrlParser: true, useCreateIndex: true },
  (err, res) => {
    if (err) throw new err;
    console.log('BBDD conectada!!!!');
  });


app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`)
})

