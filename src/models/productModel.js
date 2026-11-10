
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            trim: true,
            default: ""
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
