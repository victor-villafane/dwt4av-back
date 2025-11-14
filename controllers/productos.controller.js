import * as service from "../services/productos.services.js";
import * as views from "../views/productos.views.js";

export function getProductos(req, res) {
  service.getProductos().then((productos) => {
    res.send(views.createProductosListPage(productos));
  });
}

export function getProductoById(req, res) {
  const id = req.params.id;
  service.getProductoById(id).then((producto) => {
    if (producto) {
      res.send(views.createDetailPage(producto));
    } else {
      res.send(views.errorPage());
    }
  });
}

export function formularioNuevoProducto(req, res){
  res.send( views.formularioNuevoProducto() )
}

export function guardarProducto(req, res){
  const producto = {
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio
  }
  service.guardarProducto(producto)
    .then( productoGuardado => res.send( views.createDetailPage(productoGuardado) ) )
}

export function formularioEditarProducto(req, res){
  const id = req.params.id
  service.getProductoById(id)
    .then( (producto) => res.send(views.formularioEditarProducto(producto)) )
}

export function editarProducto(req, res){
  const id = req.params.id
  const producto = {
    id: id,
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio
  }
  service.editarProducto(producto)
    .then( productoEditado => res.send(views.createDetailPage(productoEditado)) )
}

export function formularioBorrarProducto(req, res){
  const id = req.params.id
  service.getProductoById(id)
    .then( (producto) => res.send(views.formularioBorrarProducto(producto)) )
}

export function borrarProducto(req, res){
  const id = req.params.id
  service.borrarProducto(id)
    .then( (id) => res.send( views.borrarExito(id) ) )
}