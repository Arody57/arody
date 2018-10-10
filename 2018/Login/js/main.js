$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;

        firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            .once('value').then(MostrarDatos);

            // firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            // .once('value').then(function (datos) {

    });
    $('.collapsible').collapsible();
});

var Dispositivos = {};

function MostrarDatos(datos) {
    $("#Usuarios_Todo li.colap").remove();

    Dispositivos = datos.val();

    if (!Dispositivos) {
        var mostrar = '<li>';
        mostrar += '<p class="center-align" style="padding: 10px 0px">No Existen Dispositivos</p>';
        mostrar += '</li>';
        $(mostrar).appendTo('#Dispositivos');

        var mostrar = '<li>';
        mostrar += '<p class="center-align" style="padding: 10px 0px">No Existen Dispositivos</p>';
        mostrar += '</li>';
        $(mostrar).appendTo('#DispositivosPropios');
    } else {
        $.each(Dispositivos, function (indice, valor) {

            var mostrar = '<li id=' + indice + '>';
            mostrar += '<div class="collapsible-header">';
            mostrar += '<div class="row acordeon">';
            mostrar += '<div class="col">';
            mostrar += '<p><b>Dispositivo: </b>' + valor.Nombre + '</p>';
            mostrar += '</div>';
            mostrar += '<div class="col">';
            mostrar += '<p><b>No. Serial : </b>' + valor.Serial + ' </p>';
            mostrar += '</div>';
            mostrar += '<div class="right-align">';
            mostrar += '<a class="waves-effect waves-light btn btn-eliminar red" onclick="borrarProducto(\'' + indice + '\')"><i class="material-icons">close</i></a>';
            mostrar += '</div>';
            mostrar += '</div>';
            mostrar += '</div>';

            mostrar += '<div class="collapsible-body">';
            mostrar += '<p><b>Dispositivo: </b>' + valor.Nombre + '</p>';
            mostrar += '<p><b>No.serial: </b>' + valor.Serial + '</p>';
            mostrar += '<p><b>Fecha de Ingreso: </b>' + valor.Fecha + '</p>';

            if (valor.Nombre == 'CPU' || valor.Nombre == 'Laptop') {
                mostrar += '<div class= "detalles_Acor">';
                mostrar += '<p><u>Detalles: </u></p>';
                mostrar += '<p><b>Procesador: </b>' + valor.Detalles.Procesador + '</p>';
                mostrar += '<p><b>Disco Duro: </b>' + valor.Detalles.Disco_Duro + '</p>';
                mostrar += '<p><b>RAM: </b>' + valor.Detalles.RAM + '</p>';
                mostrar += '</div>';
            } else if (valor.Nombre == 'Telefono') {
                mostrar += '<div class= "detalles_Acor">';
                mostrar += '<p><u>Detalles: </u></p>';
                mostrar += '<p><b>CPU: </b>' + valor.Detalles.cpuDisp + '</p>';
                mostrar += '<p><b>Modelo: </b>' + valor.Detalles.modeloDisp + '</p>';
                mostrar += '<p><b>Sistema Operativo: </b>' + valor.Detalles.sistemaOp + '</p>';
                mostrar += '<p><b>Version : </b>' + valor.Detalles.versionOp + '</p>';
                mostrar += '</div>';
            } else if (valor.Nombre == 'Monitor') {
                mostrar += '<div class= "detalles_Acor">';
                mostrar += '<p><u>Detalles: </u></p>';
                mostrar += '<p><b>Resolución: </b>' + valor.Detalles.resolucion + '</p>';
                mostrar += '</div>';
            };
            mostrar += '<p><b>Marca: </b>' + valor.Marca + '</p>';
            mostrar += '</div>';
            mostrar += '</li>';

            if (valor.Asignacion == "Empresa") {

                $(mostrar).appendTo('#Dispositivos');

            } else if (valor.Asignacion == "Propio") {

                $(mostrar).appendTo('#DispositivosPropios');

            }
        });

    };
};

function borrarProducto(id) {
    var user = firebase.auth().currentUser;
    if (confirm("¿Está seguro/a de que quiere borrar este artículo?") == true) {
        firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            .child(id).remove().then(location.reload());
    }
};