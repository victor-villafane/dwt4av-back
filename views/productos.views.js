import { createPage } from "../pages/utils.js";

export function createProductosListPage(productos) {
  let html = "<ul>";
  productos.forEach((producto) => {
    html += `<li>
        ${producto.modelo} 
        <a href="/productos/${producto._id}">Ver</a> | 
        <a href="/productos/editar/${producto._id}">Editar</a> | 
        <a href="/productos/borrar/${producto._id}">Borrar</a>
      </li>`;
  });
  html += "</ul>";

  return createPage("Productos", html);
}

export function createDetailPage(producto) {
  let html = "";
  html += "<ul>";
  html += `<li>Marca: ${producto.marca}</li>`;
  html += `<li>Modelo: ${producto.modelo}</li>`;
  html += `<li>Precio: ${producto.precio}</li>`;
  html += "</ul>";
  html += `<a href="/productos">Volver</a>`;
  return createPage(producto.modelo, html);
}

export function errorPage() {
  let html = "";
  html += "<h2>No se encontro el producto buscado</h2>";
  html += `<a href="/">Volver</a>`;
  return createPage("404", html);
}

export function formularioNuevoProducto(){
  let html = "<form action='/productos/nuevo' method='post' >";
  html += "<div><input type='text' name='marca' placeholder='marca' /></div>";
  html += "<div><input type='text' name='modelo' placeholder='modelo' /></div>";
  html += "<div><input type='number' name='precio' placeholder='precio' /></div>";
  html += "<div><input type='submit' value='Guardar'/></div>";
  html += "</form>"
  html += `<a href="/">Volver</a>`;
  return createPage("Nuevo producto", html);
}

export function formularioEditarProducto(producto){
  let html = `<form action='/productos/editar/${producto._id}' method='post' >`;
  html += `<div><input type='text' name='marca' placeholder='marca' value="${producto.marca}" /></div>`;
  html += `<div><input type='text' name='modelo' placeholder='modelo' value="${producto.modelo}" /></div>`;
  html += `<div><input type='number' name='precio' placeholder='precio' value="${producto.precio}" /></div>`;
  html += "<div><input type='submit' value='Editar'/></div>";
  html += "</form>"
  html += `<a href="/">Volver</a>`;
  return createPage("Editar producto", html);
}

export function formularioBorrarProducto(producto){
  let html = `<form action='/productos/borrar/${producto._id}' method='post' >`;
  html += `<div>${producto.marca}</div>`;
  html += `<div>${producto.modelo}</div>`;
  html += `<div>${producto.precio}</div>`;
  html += "<div><input type='submit' value='Borrar'/></div>";
  html += "</form>"
  html += `<a href="/">Volver</a>`;
  return createPage("Borrar producto", html);
}

export function borrarExito(id){
  let html = ""
  html += "<p>Producto borrado correctamente</p>"
  html += `<a href="/productos">Volver</a>`;
  return createPage( "Producto borrado correctamente", html )
}