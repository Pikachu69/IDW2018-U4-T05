const mongoose = require('mongoose');

let newsSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor:{
        type: String,
        required: true
    },
    nota: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: true
    },
    foto: {
        type: String,
        required: false
    }
});

const newsModel = mongoose.model('NewsSchema',newsSchema,"noticias");

module.exports = newsModel;