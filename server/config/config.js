// ===================================
// Puerto
// ===================================

// heroku nos gestiona el puerto cuando este en produccion sino le asignamos en desarrollo el puerto 3000 por defecto
process.env.PORT = process.env.PORT || 3000

// ===================================
// Entorno  
// ===================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===================================
// Vencimiento del token  
// ===================================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ===================================
// SEED de autenticación
// ===================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';



// ===================================
// BBDD
// ===================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
} else {
  //para saber esta url lo primero que hecho es una nueva conexion en mongoDb compass al dataBase 'cafe', despues he desconectado y al volver a conectar ya salia esta url.accordion
  //no encuentro en el curso como obtener la url como se indica en la clase 109.
  // urlDB = 'mongodb+srv://admin:We1KozYOR2Yf464r@cluster0.yhmml.mongodb.net/cafe?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
  // para securizar la url y no vean nuestro usu/pass y nuestro cluster en atlas, se declara variable en el entorno de heroku
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



