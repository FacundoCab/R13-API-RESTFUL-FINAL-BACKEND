const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const verificarToken = require("../middleware/verifyToken");
const verificarAdmin = require("../middleware/verificarAdmin");

// Obtener todos los productos
router.get("/", productController.obtenerProductos);

// Obtener un producto por ID
router.get("/:id", productController.obtenerProductoPorId);

// Crear un producto (solo admin)
router.post("/", verificarToken, verificarAdmin, productController.crearProducto);

// Actualizar un producto (solo admin)
router.put("/:id", verificarToken, verificarAdmin, productController.actualizarProducto);

// Eliminar un producto (solo admin)
router.delete("/:id", verificarToken, verificarAdmin, productController.eliminarProducto);

module.exports = router;