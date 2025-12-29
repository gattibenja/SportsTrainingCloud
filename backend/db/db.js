const mongoose = require('mongoose')
const strConnection = process.env.MONGO_URI

exports.connectDB = async () => {
    if (!strConnection) {
        throw new Error("El string de conexión, DB_URL, no está definido como variable de entorno")
    }
    await mongoose.connect(strConnection);
    console.log('✅ Conectado a MongoDB con Mongoose')
}