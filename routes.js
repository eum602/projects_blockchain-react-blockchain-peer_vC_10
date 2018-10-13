/*se instalo primeramente npm install --save next-routes*/
const routes =  require('next-routes')();
/*importando la libreria next-routes
require('next-routes') retorna una funcion, por lo que hay que ponerle un par
de parentesis:  require('next-routes')()
*/
/*si intento acceder a '/campaigns/new' entonces en efecto accedere a
'/campaigns/new'*/

//.add('/campaigns/:address','/campaigns/show')
/*address es un nombre cualquiera que le estoy poniendo
":" indica que :address es un wildcard(comodin) que proviene de una fuente
externa, asimismo :addres puede ser cualquier link,
campaigns/show es la pagina a la que en respuesta voy a ser redireccionado
*/
//.add('/campaigns/:address/requests','/campaigns/requests/index')
//.add('/campaigns/:address/requests/new','/campaigns/requests/new')
routes.add('/operations/mineBlock','/operations/clientmineBlock');
routes.add('/operations/createTransaction','/operations/createTransaction');
routes.add('/operations/connectUpdate','/operations/connectUpdate');
module.exports = routes;
/*module.exports exportara alugnos topicos de ayuda que nos sera util
para navegar automaticamente através de la aplicacion, asimismo nos ayuda a
generar etiquetas de enlaces para tambien mostrarlos dentro de componentes react*/
