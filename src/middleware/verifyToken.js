const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso denegado. No se proporcionó un token."
        });
    }

    try {
        const tokenLimpio = token.split(" ")[1];

        if (!tokenLimpio) {
            return res.status(401).json({
                mensaje: "Formato de token inválido."
            });
        }

        const verificado = jwt.verify(
            tokenLimpio,
            process.env.JWT_SECRET
        );

        req.usuario = verificado;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado."
        });
    }
};

module.exports = verificarToken;