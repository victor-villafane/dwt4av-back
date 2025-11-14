import express from "express"
import * as controllers from "../controllers/productos.api.controller.js"
import { validateId, validateProducto } from "../../middlewares/producto.validate.js"
import { validateToken } from "../../middlewares/token.validate.js"

const router = express.Router()
//https://www.mongodb.com/try/download/compass
router.get("/",[validateToken], controllers.getProductos)           //endpoint
router.get("/:id/recomendaciones", [validateToken], controllers.getRecomendaciones)
router.get("/:id",[validateToken, validateId], controllers.getProductoById)
router.post("/",[validateProducto, validateToken], controllers.createProduct)
router.delete("/:id",[validateToken, validateId], controllers.deleteProduct)
router.put("/:id", [validateToken, validateId],controllers.reemplazarProduct)
router.patch("/:id", [validateToken, validateId],controllers.actualizarProduct)

export default router