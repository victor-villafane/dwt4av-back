import * as services from "../../services/productos.services.js"

export function getProductos(req, res){
    services.getProductos(req.query)
        .then( productos => res.status(200).json(productos) )
}

export function getProductoById(req, res){
    const id = req.params.id
    services.getProductoById(id)
        .then( producto => {
            if(producto){
                res.status(200).json(producto)
            }else{
                res.status(404).json({message: "Recurso no encontrado"})
            }
        } )
}

export function createProduct(req, res){
    const producto = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio
    }
    services.guardarProducto(producto)
        .then( (nuevoProducto) => res.status(201).json(nuevoProducto) )
        .catch( err => res.status(500).json({message: err}) )
}

export function deleteProduct(req, res){
    const id = req.params.id
    services.borrarProducto(id)
        .then( (idBorrado) => res.status(202).json({message: `el id:${idBorrado} se elimino correctamente.`}) )
        .catch( (err) => res.status(500).json({message: `el id:${id} NO se elimino.`}) )
}

export function reemplazarProduct(req, res){
    const id = req.params.id
    const producto = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio
    }
    services.editarProducto(id, producto)
        .then( productoEditado => res.status(202).json(productoEditado) )
        .catch( err => res.status(500).json({message: "No se pudo actualizar."}) )
}

export function actualizarProduct(req, res){
    const id = req.params.id
    const producto = {
        id: id,
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio
    }
    services.actualizarProduct(producto)
        .then( productoEditado => res.status(202).json(productoEditado) )
        .catch( err => res.status(500).json({message: err}) )

}

export function getRecomendaciones(req, res){
    const id = req.params.id
    services.getRecomendacionesXproducto(id)
        .then( recomendaciones => {
            if( recomendaciones != null ){
                res.status(200).json(recomendaciones)
            }else{
                res.status(404).json({ "message": "No se encontro el producto" })
            }
        } )
        .catch( err => res.status(500).json({ "error": "No se pudo obtener las Recomendaciones" }) )
}