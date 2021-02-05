//================================
//PUERTO
//================================
process.env.PORT = process.env.PORT || 3000;

//================================
//ENTORNO
//================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================================
//Base de datos
//================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://strider:5sGE78vZS4LmLNdO@cluster0.1xupi.mongodb.net/test';
}
process.env.URLDB = urlDB;

