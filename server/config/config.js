//***************************** */
//********PUERTOS********** */
//**************************** */
process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//***************************** */
//********BD********* */
//**************************** */
let urlDB;
 if (process.env.NODE_ENV === 'dev') {
     urlDB = 'mongodb://localhost:27017/cafe';
 }
 else {
    urlDB = process.env.MONGODB_URI;
}

process.env.URLDB = urlDB;