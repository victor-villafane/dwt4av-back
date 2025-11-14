import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.y5swe9e.mongodb.net/")
const db = client.db("hibridas")

export async function getProductos( filter = {} ) {
  const filterMongo = { eliminado: { $ne: true } }

  if( filter.marca != undefined ){
    filterMongo.marca = { $eq: filter.marca }
  }

  if( filter.mayorQue != undefined ){
    filterMongo.precio = { $gte: parseInt(filter.mayorQue) }
  }

  if( filter.menorQue != undefined ){
    filterMongo.precio = { $lte: parseInt( filter.menorQue ) }
  }

  if( filter.menorQue != undefined && filter.mayorQue != undefined ){
    filterMongo.$and = [ { precio: { $lte: parseInt( filter.menorQue ) } }, { precio: { $gte: parseInt(filter.mayorQue) } } ]
  }

  if( filter.modelo != undefined ){
    // filterMongo.$text = { $search: filter.modelo }
    filterMongo.modelo = { $regex: filter.modelo, $options: 'i' }
  }

  await client.connect()
  return db.collection("componentes").find(filterMongo).toArray()
}

export async function getProductoById(id) {
  await client.connect()
  return db.collection("componentes").findOne({ _id: new ObjectId(id) })
}

export function guardarProducto(producto){
  return db.collection("componentes").insertOne(producto)
}

export async function editarProducto(id, producto){
  await client.connect()
  return db.collection("componentes").replaceOne({ _id: new ObjectId(id)}, producto)
}

export function borrarProducto(id){
  console.log(id)
  return db.collection("componentes").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}

export function actualizarProduct(producto){
  return db.collection("componentes").updateOne({ _id: new ObjectId(id) }, { $set: producto })
}

export async function getRecomendacionesXproducto(id){
  try {
    const producto = await getProductoById(id)
    return producto.aparece || []
  } catch (error) {
    return null
  }
}