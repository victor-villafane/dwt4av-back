import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "victor.villafane@davinci.edu.ar",
        pass: "pyldbqumbkxtbhpq" //contraseña de aplicacion -> no se los voy a subir 
    }
})

export async function enviarMailRecuperacion(email){
    console.log("Enviado a .... ", email)
    const tokenEmail = jwt.sign({email}, "RECUPERAR", {expiresIn: "1h"})

    const emailOptions = {
        from: "victor.villafane@davinci.edu.ar",
        to: email,
        subject: "Recuperar cuenta",
        html: `<p>Hace click en el siguiente link para recuperar tu cuenta <a href='http://localhost:5173/restablecer-contrasenia/${tokenEmail}' >Link recuperacion</a> </p>`,
        text: `Hace click en el siguiente link para recuperar tu cuenta http://localhost:5173/restablecer-contrasenia/${tokenEmail}`
    }

    return transport.sendMail(emailOptions)
}