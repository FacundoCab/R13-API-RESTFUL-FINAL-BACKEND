# R13 - API RESTful

## Descripción

R13 es una API RESTful desarrollada como Trabajo Práctico Final del curso Backend Developer de UTN.

El proyecto permite gestionar productos, categorías y usuarios mediante operaciones CRUD, utilizando Node.js, Express y MongoDB.

Incluye autenticación mediante JSON Web Tokens (JWT), cifrado de contraseñas y control de acceso según roles de usuario.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- dotenv
- CORS

## Estructura del proyecto

```text
TP FINAL back/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Modelos de datos

### Productos

- nombre
- descripcion
- precio
- stock
- categoria (referencia a Categorías)

### Categorías

- nombre
- descripcion

### Usuarios

- nombre
- email
- contraseña (almacenada mediante hash)
- rol (admin o cliente)

### Relaciones

Una categoría puede estar asociada a varios productos. Cada producto referencia una categoría mediante un ObjectId de MongoDB.

Las consultas de productos utilizan `populate()` para obtener los datos de su categoría relacionada.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/FacundoCab/R13-API-RESTFUL-FINAL-BACKEND.git
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
MONGODB_URI=TU_URI_DE_MONGODB
JWT_SECRET=TU_SECRETO_JWT
```

Completar los valores con las credenciales correspondientes.

### 4. Iniciar el servidor

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

El servidor se ejecuta por defecto en:

`http://localhost:3000`

## Endpoints

### Productos

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/productos` | Obtener todos los productos | Público |
| GET | `/api/productos/:id` | Obtener producto por ID | Público |
| POST | `/api/productos` | Crear producto | Admin |
| PUT | `/api/productos/:id` | Actualizar producto | Admin |
| DELETE | `/api/productos/:id` | Eliminar producto | Admin |

### Categorías

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/categorias` | Obtener categorías | Público |
| GET | `/api/categorias/:id` | Obtener categoría por ID | Público |
| POST | `/api/categorias` | Crear categoría | Admin |
| PUT | `/api/categorias/:id` | Actualizar categoría | Admin |
| DELETE | `/api/categorias/:id` | Eliminar categoría | Admin |

### Usuarios

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/usuarios` | Registrar usuario | Público |
| POST | `/api/usuarios/login` | Iniciar sesión | Público |
| GET | `/api/usuarios` | Obtener todos los usuarios | Admin |
| GET | `/api/usuarios/:id` | Obtener usuario por ID | Autenticado |
| DELETE | `/api/usuarios/:id` | Eliminar usuario | Admin |

## Ejemplos de solicitudes

### Crear un producto

`POST /api/productos`

```json
{
  "nombre": "Guantes de entrenamiento",
  "descripcion": "Guantes para entrenamiento funcional",
  "precio": 25000,
  "stock": 10,
  "categoria": "ID_DE_CATEGORIA"
}
```

### Crear una categoría

`POST /api/categorias`

```json
{
  "nombre": "Funcional",
  "descripcion": "Clases de entrenamiento funcional"
}
```

### Registrar un usuario

`POST /api/usuarios`

```json
{
  "nombre": "Usuario de prueba",
  "email": "usuario@example.com",
  "contraseña": "TuContraseña123"
}
```

El registro público asigna automáticamente el rol `cliente`.

### Iniciar sesión

`POST /api/usuarios/login`

```json
{
  "email": "usuario@example.com",
  "contraseña": "TuContraseña123"
}
```

La respuesta devuelve un token JWT que debe utilizarse para acceder a las rutas protegidas.

## Seguridad y autenticación

- Las contraseñas se almacenan mediante hash utilizando bcrypt.
- La autenticación utiliza JSON Web Tokens.
- Las rutas protegidas requieren un token válido.
- Las operaciones de creación, modificación y eliminación de productos y categorías requieren permisos de administrador.
- Los usuarios con rol cliente solamente pueden consultar sus propios datos.
- Las credenciales y variables sensibles se almacenan en `.env`, archivo excluido del repositorio.

## Arquitectura

El proyecto utiliza una arquitectura modular con separación de responsabilidades:

- **Models:** definen los esquemas de MongoDB.
- **Services:** contienen la lógica de negocio y las operaciones con la base de datos.
- **Controllers:** gestionan las solicitudes HTTP y las respuestas.
- **Routes:** definen los endpoints.
- **Middleware:** controla la autenticación y los permisos.
- **Config:** contiene la configuración de conexión a MongoDB.

Se implementa el patrón Service Layer para mantener separada la lógica de negocio de los controladores.

## Herramientas de prueba

Los endpoints fueron probados utilizando Thunder Client, extensión de Visual Studio Code.

## Autor

Proyecto desarrollado como Trabajo Práctico Final del curso Backend Developer - UTN.