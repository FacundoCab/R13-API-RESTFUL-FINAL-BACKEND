
const productService = require("../services/productService");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await productService.obtenerProductos();

        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener los productos",
            error: error.message
        });
    }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await productService.obtenerProductoPorId(
            req.params.id
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json(producto);
    } catch (error) {
        return res.status(400).json({
            mensaje: "ID de producto inválido",
            error: error.message
        });
    }
};

// Crear un producto
const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = await productService.crearProducto(req.body);

        return res.status(201).json(nuevoProducto);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al crear el producto",
            error: error.message
        });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado =
            await productService.actualizarProducto(
                req.params.id,
                req.body
            );

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json(productoActualizado);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al actualizar el producto",
            error: error.message
        });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
        const productoEliminado =
            await productService.eliminarProducto(req.params.id);

        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            mensaje: "Producto eliminado correctamente",
            producto: productoEliminado
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al eliminar el producto",
            error: error.message
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
