import { enviarMailRecuperacion } from '../../services/email.services.js'
import * as services from '../../services/usuarios.services.js'

export function createUser(req, res){
    services.createUser(req.body)
        .then( (usuario) => res.status(201).json(usuario) )
        .catch( err => res.status(400).json(err) )
}

export function login(req, res){
    services.login(req.body)
        .then( usuario => res.status(201).json(usuario) )
        .catch( err => res.status(400).json({ message: err.message }) )
}

export function recuperarCuenta(req, res){
    const email = req.body.email
    enviarMailRecuperacion(email)
        .then( response => res.status(200).json({ message: "Enviado" }) )
        .catch( err => res.status(500).json({ message: err }) )
}

export function restablecerContrasenia(req, res){
    const {email, password} = req.body
    services.restablecerContrasenia(email, password)
        .then( () => res.status(200).json({ message: "OK" }) )
        .catch( () => res.status(400).json({ message: ":(" }) )
}