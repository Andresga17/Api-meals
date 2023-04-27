//SE IMPORTA DOTENV PARA ACCEDER A LAS VARIABLES DE ENTORNO
//SE IMPORTA LA APP
require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

//AUTENTICACION CON LA BASE DE DATOS
db.authenticate()
  .then(() => console.log('Database authenticated!'))
  .catch((error) => console.log(error));

initModel();

//SINCRONIZACION CON LA BASE DE DATOS
db.sync()
  .then(() => console.log('Database synced!'))
  .catch((error) => console.log(error));

//DEFINIENDO EL PUERTO Y PONIENDO LA APP A ESCUCHAR
const port = +process.env.PORT || 5600;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
