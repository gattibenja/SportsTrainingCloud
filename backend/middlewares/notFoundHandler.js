
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Ruta no encontrada - ${req.originalUrl}`)
    res.status(404);
    console.log(error);
    next(error);
}
 module.exports = {notFoundHandler}