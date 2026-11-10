
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

// Obtener todos los productos con sus categorías
const obtenerProductos = async () => {
    return await Product.find().populate("categoria");
};

// Obtener un producto por su ID
const obtenerProductoPorId = async (id) => {
    return await Product.findById(id).populate("categoria");
};

// Crear un producto
const crearProducto = async (datos) => {
    const categoriaExiste = await Category.findById(datos.categoria);

    if (!categoriaExiste) {
        throw new Error("La categoría indicada no existe");
    }

    const nuevoProducto = new Product(datos);
    return await nuevoProducto.save();
};

// Actualizar un producto
const actualizarProducto = async (id, datos) => {
    if (datos.categoria) {
        const categoriaExiste = await Category.findById(datos.categoria);

        if (!categoriaExiste) {
            throw new Error("La categoría indicada no existe");
        }
    }

    return await Product.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    ).populate("categoria");
};

// Eliminar un producto
const eliminarProducto = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
