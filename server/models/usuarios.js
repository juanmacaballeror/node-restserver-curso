const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

//propiedad unique en email, es para definir que el valor del campo sea unico ne la bbdd
//propiedad enum en role, es para indicar que los valores delrole solo pueden tener los definidos

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es necesario']
  },
  password: {
    type: String,
    required: [true, 'la contraseña es obligatoria']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }

})

//si queremos borrar un campo de la tabla para no mostrar la informacion, en la response no se puede hacer el delete de la propiedad del objeto,
// hay que hacerlo ais
usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

//PATH es el campo que hemos definido como unico
usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
});

module.exports = mongoose.model('Usuario', usuarioSchema);