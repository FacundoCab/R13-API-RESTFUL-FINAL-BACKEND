
const categoryService = require("../services/categoryService");

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await categoryService.obtenerCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las categorías",
            error: error.message
        });
    }
};

const obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await categoryService.obtenerCategoriaPorId(req.params.id);

        if (!categoria) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la categoría",
            error: error.message
        });
    }
};

const crearCategoria = async (req, res) => {
    try {
        const categoria = await categoryService.crearCategoria(req.body);
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear la categoría",
            error: error.message
        });
    }
};

const actualizarCategoria = async (req, res) => {
    try {
        const categoria = await categoryService.actualizarCategoria(
            req.params.id,
            req.body
        );

        if (!categoria) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar la categoría",
            error: error.message
        });
    }
};

const eliminarCategoria = async (req, res) => {
    try {
        const categoria = await categoryService.eliminarCategoria(req.params.id);

        if (!categoria) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        return res.status(200).json({
            mensaje: "Categoría eliminada correctamente"
        });

    } catch (error) {
        if (error.message === "No se puede eliminar la categoría porque tiene productos asociados") {
            return res.status(409).json({
                mensaje: error.message
            });
        }

        return res.status(500).json({
            mensaje: "Error al eliminar la categoría",
            error: error.message
        });
    }
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};