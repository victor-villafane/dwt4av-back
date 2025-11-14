# 1. LA URL NO HACE REFERENCIA A LA ACCION, SINO QUE IDENTIFICA UN RECURSO

    URL -> Uniform resource locator
    URI -> Uniform resource Identifier

    /productos/nuevo            ->      X
    /productos/editar           ->      X
    /productos                  ->      Bien!

# 2. LAS ACCIONES SE DEFINEN CON LOS VERBOS HTTP

    GET     -> Obtener
    POST    -> Crear
    DELETE  -> Borrar
    PATCH   -> Actualizar
    PUT     -> Reemplazar

# 3. LOS DATOS DE LOS RECURSOS SON TRANSPORTADOS UTILIZANDO JSON

# 4. LOS ESTADOS DE LA PETICION SON DEFINIDOS POR LOS HTTP STATUS CODE

    1xx -> Informativos
    2xx -> TODO SALIO BIEN
    3xx -> el recurso cambio de lugar
    4xx -> Error del usuario -> 404 -> recurso no encontrado
    5xx -> Errores del servidor

    https://http.cat/
    https://http.pizza/