const Training = require('../models/model.trainings');


exports.createRegister = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const trainingData = req.body;

        const newTraining = new Training({
            ...trainingData,
            user: userId
        });

        const savedTraining = await newTraining.save();

        res.status(201).json({
            message: "Entrenamiento registrado correctamente",
            training: savedTraining
        });
    }catch(err){
        const error = {
            message: "Error al registrar entrenamiento: " + err.message,
            status: 500
        }
        next(error);
    }
}

exports.getRegisters = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const trainings = await Training.find({ user: userId }).sort({ fecha: -1 });

        res.status(200).json({
            registros: trainings
        });
    }catch(err){
        const error = {
            message: "Error al obtener registros: " + err.message,
            status: 500
        }
        next(error);
    }
}

exports.getRegistersByUser = async (req, res, next) => {
    try{
        const requester = req.user; 
        const { userId } = req.params;

        if(requester.id !== userId && requester.role !== 'coach' && requester.role !== 'admin'){
            return res.status(403).json({ error: 'No autorizado para ver los registros de este usuario' });
        }

        const trainings = await Training.find({ user: userId }).sort({ fecha: -1 });

        res.status(200).json({ registros: trainings });
    }catch(err){
        const error = {
            message: "Error al obtener registros del usuario: " + err.message,
            status: 500
        }
        next(error);
    }
}

// Obtener todos los registros (solo coaches y admins)
exports.getAllRegisters = async (req, res, next) => {
    try{
        const requester = req.user;
        if(!requester || (requester.role !== 'coach' && requester.role !== 'admin')){
            return res.status(403).json({ error: 'No autorizado' });
        }

        const trainings = await Training.find().populate('user').sort({ fecha: -1 });

        res.status(200).json({ registros: trainings });
    }catch(err){
        const error = {
            message: "Error al obtener todos los registros: " + err.message,
            status: 500
        }
        next(error);
    }
}