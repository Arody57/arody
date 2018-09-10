var imagen;
$(document).ready(function () {
    $('#btnIniciar').hide();
    // Seguridad para Saber si ha Iniciado Seccion
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Conetado');
        } else {
            console.log('Usuario No Logeado');
            location.assign('login.html');
        }
    });

    $("#imagen").change(function () {
        var descriptor = new FileReader();
        descriptor.readAsDataURL(this.files[0]);

        descriptor.onloadend = function () {
            imagen = descriptor.result;
            $("#previsualizacion").attr("src", imagen);
        };
    });

    $('#btnDatos').click(function () {
        var nombre = $('#nombre').val();

        if (nombre != "") {
            var user = firebase.auth().currentUser;
            user.updateProfile({

                displayName: nombre

            }).then(GuardarDatos).catch(function (error) {
                alert("Error" + error);
            });
        } else {
            M.toast({
                html: 'Insgrese un nombre de Usuario'
            });
        }
    });

    $('#btnIniciar').click(function(){
        location.assign('inicio.html');
    });
});

function GuardarDatos() {
    if (!imagen) {
        imagen = "https://publicdomainvectors.org/photos/1389952697.png";
    }
    var user = firebase.auth().currentUser;

    firebase.database().ref('Usuario/' + user.uid).set({
        uid: user.uid,
        Correo: user.email,
        Nombre: user.displayName,
        Foto: imagen
    });
    $('#btnIniciar').show();
    $('#btnDatos').hide();
}