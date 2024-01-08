// Importamos las libreria:
const express = require('express');

const { auth } = require('express-oauth2-jwt-bearer');
// Importamos el middleware error handler:
const errorHandler = require('./middleware/errorHandler');

// Configuramos el middleware con el servidor de Autorizacion:
const autenticacion = auth({
  audience: "http://localhost:3000/api/productos",
  issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
  tokenSigningAlg: "RS256"
});

const app = express();
app.use(express.json());

// Importamos el router de libros:
const librosRouter = require("./router/libros");

// Configuramos el middleware de autenticacion:
app.use('/libros', autenticacion ,librosRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});