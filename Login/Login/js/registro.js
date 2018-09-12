var email, password, passwordConf;

function Exitoso() {
    M.toast({
        html: 'Cuenta Creada'
    });
    
    location.assign("datos.html");
};

function alFinalizar(error) {

    if (error !== 'undefined') {
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert('ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !');
                break;
            case 'auth/invalid-email':
                alert('ERROR: El e-mail facilitado no es un e-mail correcto.');
                break;
            default:
                alert('Se ha producido un error al crear el usuario.\n\n' + error + '\n');
                break;
        }
    }
}
$(document).ready(function () {

    $('#btnRegistrar').click(function () {

        email = $('#email').val();
        password = $('#password').val();
        passwordConf = $('#passwordConf').val();

        if (password != passwordConf) {
            M.toast({
                html: 'La Confirmacion de la Contraseña es Incorrecta'
            });
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(Exitoso).catch(alFinalizar);
            $('.btn').on('click', function() {
                var $this = $(this);
              $this.button('loading');
                setTimeout(function() {
                   $this.button('reset');
               }, 8000);
            });
            
        }
    });

    $("#btnCancelar").click(function () {
        location.assign('login.html');
    });

});