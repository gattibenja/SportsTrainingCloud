const express = require("express")
const app = express()
const cors = require('cors')
require ("dotenv").config();
const { connectDB } = require("./db/db.js")
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('./models/model.users');
const PORT = process.env.PORT || 4000
const cookieParser = require('cookie-parser'); // 1. Importar cookie-parser

app.use(express.static(path.join(__dirname, 'public')));
const routerUsers = require("./routers/users.routes.js")
const routerTrainings = require("./routers/trainings.routes.js")
const {loggerMiddleware} = require("./middlewares/logger.js")
const {notFoundHandler} = require("./middlewares/notFoundHandler.js");

const allowedOriginsEnv = process.env.CORS_ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsEnv.split(',').map(s => s.trim()).filter(Boolean);

const corsOptions = {
  credentials: true,
  origin: allowedOrigins.length ? allowedOrigins : true
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.json({ 
        message: "API de Muebleria Jota Hermanos operativa.",
        endpoints: "/api/productos"
    });
});

app.get('/api/auth/me', async (req, res) => { // funcion que recuerda al front con un token existente que usuario se inicio sesion
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ error: 'No autenticado: no hay token' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar al usuario en la base de datos sin la contraseña
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user: { id: user._id, user: user.user, email: user.email, role: user.role } });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
});

app.use("/api/users", routerUsers)
app.use('/api/trainings', routerTrainings)
app.use(notFoundHandler);


app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status,
            message: err.message || 'Ha ocurrido un error en el servidor.',
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        }
    })
})


connectDB()
    .then(() => {
        console.log('✅ Base de Datos conectada')
        // Inicio del servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
        });
    })
    .catch((error) => {
        console.error('❌ Error al conectar a la base de datos:', error.message)
        process.exit(1)
    });
