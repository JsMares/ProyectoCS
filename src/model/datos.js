const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Valor = new Schema({
    titulo: String,
    autor: String,
    publicacion: Date,
    paginas: String,
    nacionalidad: String
});

module.exports = mongoose.model('datos', Valor);