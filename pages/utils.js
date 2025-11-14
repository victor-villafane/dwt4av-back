export function createPage(titulo, contenido){
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<title>'+titulo+'</title>'
    html += '</head><body>'
    html += '<a href="/productos" >home</a> | <a href="/productos/nuevo" >Nuevo producto</a>'
    html += `<h1>${titulo}</h1>`
    html += contenido
    html += "</body></html>"

    return html
}

export function createProductList(productos){
    let html = "<ul>"
    productos.forEach( cafe => {
        html += `<li>${cafe.id} - ${cafe.nombre} - ${cafe.precio}</li>`
    } )  
    html += "</ul>"

    return html
}

// module.exports = {createPage, createProductList}
// export {createPage, createProductList}