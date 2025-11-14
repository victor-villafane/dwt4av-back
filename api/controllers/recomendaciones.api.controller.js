import * as services from "../../services/recomendaciones.services.js"

export function getRecomedaciones(req, res){
    services.getRecomedaciones(req.query)
        .then( productos => res.status(200).json(productos) )
}

export function getRecomedacionById(req, res){
    const id = req.params.id
    services.getRecomedacionById(id)
        .then( recomendacion => {
            if(recomendacion){
                res.status(200).json(recomendacion)
            }else{
                res.status(404).json({message: "Recurso no encontrado"})
            }
        } )
}

export function createRecomedacion(req, res){
    services.guardarRecomedacion(req.body)
        .then( (nuevaRecomendacion) => res.status(201).json(nuevaRecomendacion) )
        .catch( err => res.status(500).json({message: err}) )
}

export function deleteRecomendacion(req, res){
    const id = req.params.id
    services.borrarRecomedacion(id)
        .then( (idBorrado) => res.status(202).json({message: `el id:${idBorrado} se elimino correctamente.`}) )
        .catch( (err) => res.status(500).json({message: `el id:${id} NO se elimino.`}) )
}

export function reemplazarRecomendacion(req, res){
    const id = req.params.id
    services.editarRecomendacion(req.body, id)
        .then( productoEditado => res.status(202).json(productoEditado) )
        .catch( err => res.status(500).json({message: "No se pudo actualizar."}) )
}

export function actualizarRecomedacion(req, res){
    const id = req.params.id
    services.actualizarRecomedacion(req.body, id)
        .then( productoEditado => res.status(202).json(productoEditado) )
        .catch( err => res.status(500).json({message: err}) )

}

export function asignarComponenteV2(req, res){
    console.log(req.params.idRecomendacion)
    console.log(req.body.idComponente)
    services.asignarComponenteV2(req.params.idRecomendacion, req.body.idComponente)
        .then( productos => res.status(200).json(productos) )
}