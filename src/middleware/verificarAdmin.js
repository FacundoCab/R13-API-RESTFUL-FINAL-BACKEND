
const verificarAdmin = (req, res, next) => {

    if (req.usuario.rol !== "admin") {
        return res.status(403).json({
            mensaje: "Acceso denegado. Se requieren permisos de administrador."
        });
    }

    next();
};

module.exports = verificarAdmin;
