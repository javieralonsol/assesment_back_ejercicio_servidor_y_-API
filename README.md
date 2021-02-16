# Ejercicio servidor y API

## Crea un servidor con express que permita registrarse (la información se guardará en un archivo json) y loguearse. A mayores tendrá una ruta solo accesible para usuarios registrados (ej: /got) donde pondrá lo que queráis.

## Extra 1
### Las contraseñas se guardarán encriptadas.

## Extra 2
### La ruta inicial (/) también será privada y al intentar acceder SIN token a cualquiera de las dos se redireccionará a /login.

## Extra 3a:
### La información que devuelva la ruta privada la obtendrá de una API (ej: https://anapioficeandfire.com/). Podéis escoger los datos que se muestran en esta ruta inicial.


## Extra 3b:
### Dicha ruta recibirá un parámetro que coincida con las rutas de la API, la llamará y devolverá toda la info que haya en esa ruta (ej: si seguimos con el ejemplo de Juego de Tronos, nuestra ruta /got/characters devolvería toda la info de todos los personajes, /got/houses devolvería toda la info de todas las casas...).

## Extra 3c:
### Si se añade una query, los resultados se filtrarán en base a esa query ( ej: /got/characters?gender=female devolvería toda la información de los personajes femeninos, /got/characters?culture=Northern la de los norteños, /got/characters?gender=female&culture=Northern la de las mujeres norteñas...).

## Requirements
- No se podrá registrar dos veces un usuario con el mismo mail.
- Si se intenta entrar a una ruta privada con un token inválido (o sin token si no redirecciona), saltará a un middeware de error.
- El servidor también tendrá un middeware "not found" al que accederá si intentamos acceder a cualquier ruta no definida.
- Se asumirá que las rutas que llegan siempre serán correctas, pero se valorará positivamente cualquier método de validación.
- También se valorará positivamente cualquier mejora o ampliación, la limpieza del código y la documentación (comentarios).