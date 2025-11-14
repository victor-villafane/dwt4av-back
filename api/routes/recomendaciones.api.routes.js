import express from "express"
import * as controllers from "../controllers/recomendaciones.api.controller.js"

const router = express.Router()
//https://www.mongodb.com/try/download/compass
router.get("/", controllers.getRecomedaciones)           //endpoint
router.get("/:id", controllers.getRecomedacionById)
router.post("/", controllers.createRecomedacion)
router.delete("/:id", controllers.deleteRecomendacion)
router.put("/:id", controllers.reemplazarRecomendacion)
router.patch("/:id", controllers.actualizarRecomedacion)

router.post("/:idRecomendacion", controllers.asignarComponenteV2)

export default router