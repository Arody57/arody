$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            // console.log('Usuario: ' + user.uid + ' está logueado con ' + user.providerData[0].providerId);
            // var logueado = '<li><a>' + user.displayName + '</a></li>';

            var user = firebase.auth().currentUser;

            firebase.database().ref("Usuario/" + user.uid).once("value").then(function(snapshot){
                var nombre = (snapshot.val() && snapshot.val().Nombre) || 'Anonymous';
                var foto = (snapshot.val() && snapshot.val().Foto) || '??';
                
                var MostrarDatos = '<img src = '+ foto +' class = "avatar"><br>';
                MostrarDatos +='<h5>'+ nombre +'</h5>';

                $(MostrarDatos).appendTo('#Mostrardatos');

            });


            var logueado = '<li>Salir</li>';
            logueado += '<li><a class="waves-effect waves-light btn blue darken-3"><i class="material-icons" id="btnLogout">exit_to_app</i></a></li>';

            $(logueado).appendTo('#nav-mobile');

            $(btnLogout).click(desconectar);

        } else {
            console.log('Usuario No Logeado');
            location.assign('index.html');
        }
    });


    $('#btnGuardar').click(function () {
        var user = firebase.auth().currentUser;
        var nombre = $('#nombre').val();
        var telefono = $('#telefono').val();

        user.updateProfile({
            displayName: nombre,
            photoURL: telefono

        }).then(function () {
            M.toast({
                html: 'Actualizado'
            });
            console.log(user);
        }).catch(function (error) {
            alert("Error");
        });
    });

});

function desconectar() {
    firebase.auth().signOut().then(function () {
        location.assign('login.html');
    }, function (error) {
        M.toast({
            html: 'Error al Deslogearse'
        });
    });
};