import yup from 'yup'

export const productosSchema = yup.object({
    marca: yup.string().required("La marca es un campo requerido").min(3, "Marca como minimo debe tener 3 caractes").max(20, "Marca como maximo debe tener 20 caracteres"),
    modelo: yup.string().min(3, "Modelo tiene que tener como minimo 3 caracteres").max(20, "Modelo como maximo debe tener 20 caracteres").required("El modelo es un campo requerido"),
    precio: yup.number().typeError("Precio debe ser un numero").required("Precio es un campo requerido").positive("Precio debe ser positivo"),
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{24}$/, "No es un id de mongo db")
})