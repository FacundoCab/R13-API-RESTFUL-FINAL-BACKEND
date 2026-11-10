
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const verificarToken = require("../middleware/verifyToken");
const verificarAdmin = require("../middleware/verificarAdmin");

// Obtener todos los usuarios
router.get("/", verificarToken, verificarAdmin, userController.obtenerUsuarios);

// Obtener un usuario por ID
router.get("/:id", verificarToken, userController.obtenerUsuarioPorId);

// Crear un usuario
router.post("/", userController.crearUsuario);

// Iniciar sesion
router.post("/login", userController.iniciarSesion);

// Eliminar un usuario
router.delete("/:id", verificarToken, verificarAdmin, userController.eliminarUsuario);

module.exports = router;
