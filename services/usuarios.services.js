import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import { createToken } from "./token.services.js"
import jwt from 'jsonwebtoken'

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.y5swe9e.mongodb.net/")
const db = client.db("hibridas")


export async function createUser(usuario){
    await client.connect()
    const existe = await db.collection("usuarios").findOne({email: usuario.email})
    if( existe ) throw new Error("No se pudo registrar el usuario")

    const nuevoUsuario = { ...usuario, password: undefined, passwordConfirm: undefined }

    nuevoUsuario.password = await bcrypt.hash(usuario.password, 10)

    await db.collection("usuarios").insertOne(nuevoUsuario)

    return {...nuevoUsuario, password: undefined}
}

export async function login(usuario){
    await client.connect()

    const existe = await db.collection("usuarios").findOne({email: usuario.email})
    if( !existe ) throw new Error("No se pudo ingresar")

    const token = await createToken(existe)
    
    return { ...existe, password: undefined, passwordConfirm: undefined, token }
}

export async function restablecerContrasenia(tokenEmail, password){
    await client.connect()
    const payload = jwt.verify(tokenEmail, "RECUPERAR")
    const email = payload.email

    const existe = await db.collection("usuarios").findOne({email: email})
    if( !existe ) throw new Error("No se pudo ingresar")

    await db.collection("usuarios").updateOne({email: email}, {
        $set: { password: await bcrypt.hash(password, 10) }
    })

    return "OK"
}