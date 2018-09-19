$(document).ready(function () {

    $('#guardarDis').click(function () {
        var nombre = $('#Dispositivo').val();
        var Serial = $('#Serial').val();
        var asignacion = $('#AsignacionText').val();


        var user = firebase.auth().currentUser;

        var Datos = {
            Nombre: nombre,
            Serial: Serial,
            Asignacion: asignacion
        }

        firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            .push(Datos);
    });
});