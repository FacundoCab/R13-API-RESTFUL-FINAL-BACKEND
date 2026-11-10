
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await userService.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los usuarios",
            error: error.message
        });
    }
};


// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const idSolicitado = req.params.id;
        const usuarioAutenticado = req.usuario;

        // Si no es administrador, solamente puede consultar sus propios datos
        if (
            usuarioAutenticado.rol !== "admin" &&
            usuarioAutenticado.id !== idSolicitado
        ) {
            return res.status(403).json({
                mensaje: "No tenés permisos para consultar este usuario"
            });
        }

        const usuario = await userService.obtenerUsuarioPorId(idSolicitado);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const usuarioSeguro = usuario.toObject();
        delete usuarioSeguro.contraseña;

        res.status(200).json(usuarioSeguro);

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al obtener el usuario",
            error: error.message
        });
    }
};


// Crear un usuario

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;

        const usuario = await userService.crearUsuario({
            nombre,
            email,
            contraseña,
            rol: "cliente"
        });

        const usuarioSeguro = usuario.toObject();
        delete usuarioSeguro.contraseña;

        res.status(201).json(usuarioSeguro);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: "Ya existe un usuario con ese email"
            });
        }

        res.status(400).json({
            mensaje: "Error al crear el usuario",
            error: error.message
        });
    }
};


// Iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        if (!email || !contraseña) {
            return res.status(400).json({
                mensaje: "El email y la contraseña son obligatorios"
            });
        }

        const usuario = await userService.buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            });
        }

        const contraseñaValida = await bcrypt.compare(
            contraseña,
            usuario.contraseña
        );

        if (!contraseñaValida) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Enviar respuesta al cliente
        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al iniciar sesión",
            error: error.message
        });
    }
};


// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await userService.eliminarUsuario(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al eliminar el usuario",
            error: error.message
        });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    iniciarSesion,
    eliminarUsuario
};

