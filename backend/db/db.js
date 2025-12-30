const mongoose = require('mongoose')
const strConnection = process.env.MONGO_URI

// Simple connection with retry/backoff
exports.connectDB = async () => {
    if (!strConnection) {
        throw new Error("El string de conexión, MONGO_URI, no está definido como variable de entorno")
    }

    const maxRetries = 5;
    let attempt = 0;
    const connect = async () => {
        try {
            attempt++;
            await mongoose.connect(strConnection, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('✅ Conectado a MongoDB con Mongoose')
        } catch (err) {
            console.error(`Error conectando a MongoDB (attempt ${attempt}):`, err.message);
            if (attempt < maxRetries) {
                const backoff = 500 * attempt; // ms
                console.log(`Reintentando en ${backoff}ms...`);
                await new Promise(r => setTimeout(r, backoff));
                return connect();
            }
            throw err;
        }
    }

    return connect();
}