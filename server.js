import express from "express";
import ProductosRoute from "./routes/productos.routes.js"
import ProductosApiRoute from "./api/routes/productos.api.routes.js"
import RecomendacionApiRoute from "./api/routes/recomendaciones.api.routes.js"
import UsuariosApiRoute from './api/routes/usuarios.api.routes.js'
import swaggerUI from 'swagger-ui-express'
import swaggerJSON from './swagger.output.json' with { type: 'json' }
import cors from 'cors'

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, PATCH, DELETE" //ES UNA CADENA 
}

app.use(cors(corsOptions))

app.use( express.urlencoded({extended: true}) )
app.use( express.json() )

app.use( '/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON) )

app.use(ProductosRoute)
app.use("/api/productos",ProductosApiRoute)
app.use("/api/recomendacion", RecomendacionApiRoute)
app.use( "/api/usuarios", UsuariosApiRoute )
app.listen(2025, () => console.log("funcionando"));
