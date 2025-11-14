import { MongoClient, ObjectId } from "mongodb"
import * as serviceComponentes from "./productos.services.js"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.y5swe9e.mongodb.net/")
const db = client.db("hibridas")

export async function getRecomedaciones( filter = {} ) {
  const filterMongo = { eliminado: { $ne: true } }
  await client.connect()
  return db.collection("recomendaciones").find(filterMongo).toArray()
}

export async function getRecomedacionById(id) {
  await client.connect()
  return db.collection("recomendaciones").findOne({ _id: new ObjectId(id) })
}

export function guardarRecomedacion(recomendacion){
  return db.collection("recomendaciones").insertOne(recomendacion)
}

export function editarRecomendacion(recomendacion, id){
  return db.collection("recomendaciones").replaceOne({ _id: new ObjectId(id), recomendacion })
}

export function borrarRecomedacion(id){
  console.log(id)
  return db.collection("recomendaciones").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}

export function actualizarRecomedacion(recomendacion, id){
  return db.collection("recomendaciones").updateOne({ _id: new ObjectId(id) }, { $set: recomendacion })
}

export async function asignarComponenteV2(idRecomendacion, idComponente){
  await client.connect()
  const componente = await serviceComponentes.getProductoById(idComponente)
  const recomendacion = await getRecomedacionById(idRecomendacion)
  const { componentes, ...recomendacionSINCOMPONENTES } = recomendacion;
  await db.collection("recomendaciones").updateOne({ _id: new ObjectId(idRecomendacion) }, { $push: { componentes: { ...componente } } })
  await db.collection("componentes").updateOne({ _id: new ObjectId(idComponente) }, { $push: { aparece: { ...recomendacionSINCOMPONENTES } } })
  return { componente, recomendacion }
}