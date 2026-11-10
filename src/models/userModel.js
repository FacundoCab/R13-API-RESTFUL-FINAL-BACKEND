
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        contraseña: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            enum: ["admin", "cliente"],
            default: "cliente"
        }
    },
    { timestamps: true }
);

// Encriptar la contraseña antes de guardar el usuario
userSchema.pre("save", async function () {
    if (!this.isModified("contraseña")) return;

    this.contraseña = await bcrypt.hash(this.contraseña, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
