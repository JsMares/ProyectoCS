const express = require('express');
const log = require('morgan'); //para saber que clientes se están conectando
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const indexRoutes = require('./routes/index.js');

//Escuchar servidor
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view egine', 'ejs');

//Conexion a la BD
mongoose.connect('mongodb+srv://JsMares:39Bq7tRcOvM3VSYx@cluster0.vqet7sy.mongodb.net/cs?retryWrites=true&w=majority')
.then(bd => console.log('La BD se conectó')).catch(err => console.log(err));

//Middleware - Para hacer uso de morgan
app.use(log('dev'));
app.use(bodyParser.urlencoded({extended: false}));

//Rutas
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log('Servidor funcionando en el puerto', app.get('port'));
});

