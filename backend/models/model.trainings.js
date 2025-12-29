const mongoose = require('mongoose');


const trainingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    tipoEntrenamiento: {
        type: String,
        enum: ['Físico', 'Técnico', 'Táctico', 'Recuperación'],
        required: true
    },
    duracion: { // en minutos
        type: Number,
        required: true
    },
    rpe: { // Esfuerzo percibido 1-10
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    fatiga: { // Fatiga al finalizar 1-10
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    dolor: {
        type: Boolean,
        default: false
    },
    zonaDolor: {
        type: String
    },
    calidadDescanso: {
        type: String,
        enum: ['Mala', 'Normal', 'Buena'],
        required: true
    },
    estadoAnimo: {
        type: String,
        enum: ['Bajo', 'Normal', 'Alto'],
        required: true
    },
    notas: {
        type: String
    }

}, {timestamps:true})

const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;