import express from "express"
import * as controller from '../controllers/productos.controller.js'

const route = express.Router()

route.get("/productos", controller.getProductos)
route.get("/productos/nuevo", controller.formularioNuevoProducto)
route.post("/productos/nuevo", controller.guardarProducto)
route.get("/productos/editar/:id", controller.formularioEditarProducto)
route.post("/productos/editar/:id", controller.editarProducto)
route.get("/productos/borrar/:id", controller.formularioBorrarProducto)
route.post("/productos/borrar/:id", controller.borrarProducto)
route.get("/productos/:id", controller.getProductoById)

export default route