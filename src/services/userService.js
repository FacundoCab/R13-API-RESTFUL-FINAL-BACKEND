
const User = require("../models/userModel");

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    return await User.find().select("-contraseña");
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
    return await User.findById(id).select("-contraseña");
};

const buscarUsuarioPorEmail = async (email) => {
    return await User.findOne({ email: email.toLowerCase().trim() });
};

// Crear un usuario
const crearUsuario = async (datos) => {
    const nuevoUsuario = new User(datos);
    return await nuevoUsuario.save();
};

// Eliminar un usuario
const eliminarUsuario = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    buscarUsuarioPorEmail,
    crearUsuario,
    eliminarUsuario
};
