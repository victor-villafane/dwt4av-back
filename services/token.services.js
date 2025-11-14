import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from "mongodb"
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.y5swe9e.mongodb.net/")
const db = client.db("hibridas")
const tokens = db.collection("tokens")

const SECRET_KEY = "dwt4av"

export async function createToken(usuario) {
    await client.connect()

    const token = jwt.sign({ ...usuario, password: undefined, passwordConfirm: undefined }, SECRET_KEY, {
        expiresIn: '2h'
    })
    await tokens.updateOne({usuarioId: usuario._id}, { $set: { usuarioId: usuario._id, token: token } }, { upsert: true })

    return token
}

export async function validateToken(token){
    try {
        await client.connect()
        const payload = jwt.verify(token, SECRET_KEY)

        const session = await tokens.findOne({token: token, usuarioId: new ObjectId(payload._id) })

        if( !session ) throw new Error("Token invalido")

        //iat: Fecha de creacion del token
        //exp: Fecha de expiracion del token

        if( payload.exp < ( new Date().getTime()/1000 ) ) throw new Error("Token expirado")

        return payload
    } catch (error) {
        throw new Error(error.message)
    }

}