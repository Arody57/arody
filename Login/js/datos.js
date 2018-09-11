var imagen;
$(document).ready(function () {
    // Seguridad para Saber si ha Iniciado Seccion
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Conetado');
        } else {
            console.log('Usuario No Logeado');
            location.assign('index.html');
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
        if (nombre != "") {
            $("#spinner").html("<img src='imagenes/spinner.gif' style='width:100px; height:100px;'/>");
            $('#btnDatos').hide();

            if (!imagen) {
                imagen = "http://tecdistro.com/wp-content/uploads/2015/04/user.png";
            }
            var nombre = $('#nombre').val();
            var user = firebase.auth().currentUser;

            firebase.database().ref('Usuario/' + user.uid).set({
                uid: user.uid,
                Correo: user.email,
                Nombre: nombre,
                Foto: imagen

            }, function () {
                M.toast({
                    html: 'Datos Guardados'
                });
                setTimeout ('Exitoso()', 5000); 
                location.assign('inicio.html');
            });

        } else {
            M.toast({
                html: 'Ingrese un nombre de Usuario'
            });
        }
    });
});

function Exitoso(){
    $("#spinner").html("");
}