const User = require("../models/model.users");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser'); 

exports.userSignUp = async (req, res, next) => {
    const  {email, password, nombre, apellido, dni, role, deporte, posicion, club, division, secretPassword} = req.body
    
    if(role === 'coach'){
        if(!email || !password || !nombre || !dni || !role|| !deporte || !posicion || !club || !secretPassword){
     return res.status(400).json({error: "Todos los campos son necesarios"})
    }
    }else{
        if(!email || !password || !nombre || !dni || !role|| !deporte || !posicion || !club ){
     return res.status(400).json({error: "Todos los campos son necesarios"})
    }}
    
   
    try{
      
        if(await User.findOne({email: email})){
            const error = new Error("El email esta en uso")   
            error.status = 400;
            return next(error);
        }

        if(secretPassword){
            const isValidSecretPassword = secretPassword === process.env.CLAVE_ADMIN
        if(!isValidSecretPassword){
            const error = new Error("Credenciales invalidas")
            error.status = 403
            return next(error)
        }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            password: hashedPassword,
            nombre,
            dni,
            role,
            deporte,
            posicion,
            club,
            division,
        });
       
        const savedUser = await newUser.save()

        console.log("Usuario creado correctamente");
        res.status(201).json({
            message: "Usuario creado correctamente",
            _id: savedUser._id,
            email: savedUser.email,
            nombre: savedUser.nombre
        });
        

    }catch(err){
        console.error("Error al registrar el usuario: ", err.message)
        err.status = 404
        next(err)
    }
    
}

exports.userLogIn = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            const error = new Error("Credenciales invalidas")
            error.status = 401
            return next(error)
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if(!isValidPassword){
            const error = new Error("Credenciales invalidas")
            error.status = 403
            return next(error)
        }
        
        const token = jwt.sign(
            {
                id: user._id, 
                user: user.user, 
                role: user.role
            },
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
    );

    
        // Determine if request is secure (behind proxy like Render set x-forwarded-proto)
        const forwardedProto = req.headers['x-forwarded-proto'];
        const isSecure = req.secure || (forwardedProto && forwardedProto.includes('https')) || process.env.NODE_ENV === 'production';

        const cookieOptions = {
            httpOnly: true,
            secure: Boolean(isSecure),
            sameSite: 'none',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        };

        // Do NOT set domain here; let the browser set the cookie for the responding origin (Pages domain)
        res.cookie('token', token, cookieOptions);

                return res.status(200).json({ 
                    user: {
                        message: "Credenciales validadas correctamente",
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        role: user.role,
                        deporte: user.deporte,
                        posicion: user.posicion,
                        club: user.club
                    }
                });

    }catch(err){
        const error = {
            message: err.message,
            status: 500
        }
        next(error)
    }
}

exports.logOut = async (req, res, next) => {
    const forwardedProto = req.headers['x-forwarded-proto'];
    const isSecure = req.secure || (forwardedProto && forwardedProto.includes('https')) || process.env.NODE_ENV === 'production';

    // Clear cookie using the same options used to set it (except value)
    res.clearCookie('token', {
        httpOnly: true,
        secure: Boolean(isSecure),
        sameSite: 'none',
        path: '/',
    });

    res.json({ message: 'Logout exitoso' });

}

exports.getUsers = async (req, res, next) => {
    try{
        const users = await User.find({}).select('-password')
        res.json({Usuarios: users})

    }catch(err){
        const error = {
            message: "Error al obtener todos los usuarios: " + err.message,
            status: 500
        }
        next(error)
    }
}

exports.changeUserRole = async (req, res, next) => {
    try{
        const {id: targetUserId} = req.params
        const {newRole} = req.body

         if (!['atleta', 'coach'].includes(newRole)) {
            return res.status(400).json({ error: "Rol inválido. Solo se permite 'user' o 'admin'." });
        }
        
       const updatedUser = await User.findByIdAndUpdate(
            targetUserId,
            { role: newRole },
            { new: true } //
        ).select('-password'); 
         if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

         res.status(200).json({
            message: `Rol del usuario ${updatedUser.user} actualizado a ${newRole}`,
            user: updatedUser
        });
    }catch(err){
        const error = {
            message: err.message,
            status: 500
        }
        next(error)
    }

}

exports.getCoaches = async (req, res, next) => {
    try {
        const coaches = await User.find({ role: 'coach' }).select('nombre apellido _id club');
        res.json(coaches);
    } catch (err) {
        next(err);
    }
}

exports.updateUserProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Evitamos que se actualicen campos sensibles por esta vía si es necesario
        delete updates.password;
        delete updates.role;
        delete updates.email;

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        res.status(200).json({
            message: "Perfil actualizado correctamente",
            user: updatedUser
        });
    } catch (err) {
        const error = {
            message: err.message,
            status: 500
        }
        next(error)
    }
}