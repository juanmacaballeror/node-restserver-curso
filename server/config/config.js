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
// BBDD
// ===================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
} else {
  //para saber esta url lo primero que hecho es una nueva conexion en mongoDb compass al dataBase 'cafe', despues he desconectado y al volver a conectar ya salia esta url.accordion
  //no encuentro en el curso como obtener la url como se indica en la clase 109
  urlDB = 'mongodb+srv://admin:We1KozYOR2Yf464r@cluster0.yhmml.mongodb.net/cafe?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
  //urlDB = 'mongodb+srv://admin:We1KozYOR2Yf464r@cluster0.yhmml.mongodb.net/admin?authSource=admin&replicaSet=atlas-h9l7ss-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
}

process.env.URLDB = urlDB;



