const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const verificarToken = require("../middleware/verifyToken");
const verificarAdmin = require("../middleware/verificarAdmin");

// Obtener todas las categorías
router.get("/", categoryController.obtenerCategorias);

// Obtener una categoría por ID
router.get("/:id", categoryController.obtenerCategoriaPorId);

// Crear una categoría (solo admin)
router.post("/", verificarToken, verificarAdmin, categoryController.crearCategoria);

// Actualizar una categoría (solo admin)
router.put("/:id", verificarToken, verificarAdmin, categoryController.actualizarCategoria);

// Eliminar una categoría (solo admin)
router.delete("/:id", verificarToken, verificarAdmin, categoryController.eliminarCategoria);

module.exports = router;