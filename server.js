import express from "express";
import ProductosRoute from "./routes/productos.routes.js"
import ProductosApiRoute from "./api/routes/productos.api.routes.js"
import RecomendacionApiRoute from "./api/routes/recomendaciones.api.routes.js"
import UsuariosApiRoute from './api/routes/usuarios.api.routes.js'
import swaggerUI from 'swagger-ui-express'
import swaggerJSON from './swagger.output.json' with { type: 'json' }
import multer from "multer"
import sharp from "sharp"
import cors from 'cors'

const app = express();

const corsOptions = {
    origin: ["*"],
    methods: "GET, POST, PUT, PATCH, DELETE" //ES UNA CADENA 
}

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.use(ProductosRoute)
app.use("/api/productos", ProductosApiRoute)
app.use("/api/recomendacion", RecomendacionApiRoute)
app.use("/api/usuarios", UsuariosApiRoute)

const storage = multer.diskStorage({
    destination: (req, res, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, file.originalname.trim().replace(" ", "_"))
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("Tipo de archivo no soportado"), false)
    }

}

async function resizeImage(req, res, next) {
    return sharp(req.file.path)
        .resize(1500)
        .webp()
        .toFile( "uploads/" + (new Date()).getTime() + ".webp" )
        .then( () => next() )
        .catch( () => res.status(500).json({message: "No se pudo procesar la imagen"}) )
}

const upload = multer({ storage: storage, fileFilter: fileFilter })
app.post("/upload", [upload.single("file"), resizeImage], (req, res) => {
    console.log(req.file)
})

const port = process.env.PORT || 2025

app.listen(port, () => console.log("funcionando en " + port));
