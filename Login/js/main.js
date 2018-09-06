$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            console.log('Usuario: ' + user.uid + ' está logueado con ' + user.providerData[0].providerId);
            var logueado = '<li><a>' + user.displayName + '</a></li>';
            logueado += '<li><a class="waves-effect waves-light btn blue darken-3"><i class="material-icons" id="btnLogout">exit_to_app</i></a></li>';

            $(logueado).appendTo('#nav-mobile');
            $(btnLogout).click(desconectar);

        } else {
            console.log('Usuario No Logeado');
            location.assign('login.html');
        }
    });

    firebase.database()


    
    function desconectar() {
        firebase.auth().signOut().then(function () {
            location.assign('login.html');
        }, function (error) {
            M.toast({
                html: 'Error al Deslogearse'
            });
        });
    };

    $('#btnGuardar').click(function(){
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