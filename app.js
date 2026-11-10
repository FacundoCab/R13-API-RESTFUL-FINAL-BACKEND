const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarDB = require("./src/config/db"); 
const productRoutes = require("./src/routes/productRoute");
const categoryRoutes = require("./src/routes/categoryRoute");
const userRoutes = require("./src/routes/userRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/productos", productRoutes);
app.use("/api/usuarios", userRoutes);

app.use("/api/categorias", categoryRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "API de R13 funcionando correctamente"
    });
});

const iniciarServidor = async () => {
    await conectarDB();

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
};

iniciarServidor();
