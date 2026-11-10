
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const obtenerCategorias = async () => {
    return await Category.find().sort({ nombre: 1 });
};

const obtenerCategoriaPorId = async (id) => {
    return await Category.findById(id);
};

const crearCategoria = async (datos) => {
    const nuevaCategoria = new Category(datos);
    return await nuevaCategoria.save();
};

const actualizarCategoria = async (id, datos) => {
    return await Category.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );
};

const eliminarCategoria = async (id) => {
    const productosAsociados = await Product.exists({
        categoria: id
    });

    if (productosAsociados) {
        throw new Error(
            "No se puede eliminar la categoría porque tiene productos asociados"
        );
    }

    return await Category.findByIdAndDelete(id);
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
