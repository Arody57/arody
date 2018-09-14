// Inicializacion de la Pagina
$(document).ready(function () {
    // Funcion del firebase para verificar si a inicado session

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // firebase.auth().currentUser nos ayuda a elejir el usuario            
            var user = firebase.auth().currentUser;

            // Se conecta a ala base de datos y Busca los valores del usuario conectado
            firebase.database().ref("Usuario/" + user.uid + "/Cuenta")
                .once("value").then(VerDatos);

            // Dibujar los valore en la paginaVerDatos

            var logueado = '<li>Salir</li>';
            logueado += '<li><a class="waves-effect waves-light btn light-green darken-1"><i class="material-icons" id="btnLogout">exit_to_app</i></a></li>';

            // la variable 'logeado' se va a dibujar en el ID nav-mobile
            $(logueado).appendTo('#nav-mobile');


            firebase.database().ref("Usuario/" + user.uid + "/Dispositivos")
                .once("value").then(VerDispositivos);

            

            // Funcion cuando se haga click en el boton salir
            $(btnLogout).click(desconectar);
        } else {
            // Si el Usuario no a inicado session se regresara al login.html
            location.assign('index.html');
        }
    });
    // Materialize para el menu lateral izquierdo 
    // lo que hace es esconder el menu cuando la pantalla este pequeño
    $('.sidenav').sidenav();


    
});

// Funcion para dibujar los datos en la pagina
// esta funcion se usa en la linea 12
function VerDatos(snapshot) {
    var nombre = (snapshot.val() && snapshot.val().Nombre);
    var foto = (snapshot.val() && snapshot.val().Foto);
    var email = (snapshot.val() && snapshot.val().Correo);

    var MostrarDatos = '<a href="#user"><img class="circle" src=' + foto + '></a>';
    MostrarDatos += '<a href="#name"><span class="white-text name">' + nombre + '</span></a>';
    MostrarDatos += '<a href="#email"><span class="white-text email">' + email + '</span></a>';

    $(MostrarDatos).appendTo('#Mostrardatos');

}

function VerDispositivos(snapshot){
    var nombre = (snapshot.val() && snapshot.val().Nombre);
    var serial = (snapshot.val() && snapshot.val().Serial);
    var asig = (snapshot.val() && snapshot.val().Asignacion);

    var dispo = '<tr><td>'+ nombre +'</td><td>'+ serial +'</td><td>'+ asig +'</td></tr>';

    $(dispo).appendTo('#Dispositivos');
}


// Funcon para cerrar session
// esta funcion se usa en la linea 24
function desconectar() {
    firebase.auth().signOut().then(function () {
        location.assign('login.html');
    }, function () {
        M.toast({
            html: 'Error al Deslogearse'
        });
    });
};