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
    urlDB = 'mongodb+srv://aayala:rbrkEBhwXIRrucZC@cluster0-jvpr8.mongodb.net/cafe';
}

process.env.URLDB = urlDB;