/*
APUNTES PARA NO OLVIDAR
======================

librerias usadas
- - - - - - - - -
body-parser--> Esamos esta libreria para obtener los datos del body que se pasan por parametros
(es un paquete NPM que analiza los cuerpos de las solicitudes entrantes en un middleware antes que los controladores, disponible en la req.bodypropiedad)
mongoose--> Usamos para poder realizar cualquier funcionalidad con MONGODB, crear esquemas,conectar la bbdd,etc..
mongoose-unique-validator--> si en el esquema indicamos que un campo tiene que ser unico, para poder definir una descripcion personalizada udamos lo siguiente;
          nombre_esquema.plugin(uniqueValidator, {
            message: '{PATH} debe de ser único'
          });
bcrypt-->si queremos encriptar los datos al hacer una peticion post por ejemplo una password, usamos este plugin para que los datos estén encriptados y no puedan verse.
underscore-->esta libreria tiene muchas funcionalidades, una de ellas en esta aplicacion usamos la funcion 'pick', la usamos para poder decirle en una peticion put, que campos queremos
            que se actualicen, y el resto de los campos del esquema que no estén definidos en el rango dentro de la funcionalidad de pick no se actualizaran



*/

