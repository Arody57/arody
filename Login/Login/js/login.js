var email, password;

function Exitoso() {
    // M.toast({
    //     html: ':)'
    // });
    // $("#spinner").html("");
    location.assign("index.html");
};

function error() {
    M.toast({
        html: 'Usuario O Contraseña Incorrectos'
    });
}

$(document).ready(function () {

    $('#btnLogin').click(function () {
        email = $('#email').val();
        password = $('#password').val();

        firebase.auth().signInWithEmailAndPassword(email, password).then(Exitoso).catch(error);

        
    });

    $('#btnRegistro').click(function () {
        location.assign('registro.html');
    });

    // $('#btnCancelar').click(function () {
    //     location.assign('index.html');
    // });

});