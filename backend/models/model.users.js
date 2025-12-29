const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    password: {
        required: true,
        type: String,
    },
    nombre: {
        required: true,
        type: String,
        unique: true
    },
    nombre: {
        required: true,
        type: String,
        unique: true
    },
    dni: {
        required: true,
        type: String,
        unique: true
    },
    role: { 
        type: String,
        enum: ['atleta', 'coach'],
        default: 'atleta'
    },
    deporte: { 
        type: String,
        enum: ['Tenis', 'Futbol', 'Voley', 'Rugby', 'Handball', 'Basquet'],
    },
    posicion: { 
        type: String,
        required: true
    },
    club: { 
        type: String,
        required: true
    },
    division: { 
        type: String,
    },
    dominancia: { 
        type: String,
        enum: ['diestro', 'zurdo'],
    },
    nacimiento: { 
        type: Date,
    },
    altura: { 
        type: String,
    },
    peso: { 
        type: String,
    },
    lesiones: { 
        type: String,
    },
    estado: { 
        type: String,
    },
    zonasSensibles: { 
        type: String,
    },
    diasDisponiblesGimnasio: { 
        type: String,
    },
    diasPracticaDeporte: { 
        type: String,
    },
    frecuenciaDeCompetencia: { 
        type: Date,
    },
    objetivosAtleta: { 
        type: String,
        enum: ['rendimiento', 'fuerza', 'potencia', 'prevencion lesiones', 'recomposicion corporal', 'volver de lesion']
    },
    salto: { 
        type: Date,
    },
    sprint: { 
        type: Date,
    },
    frecuenciaDeCompetencia: { 
        type: Date,
    }
    
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;