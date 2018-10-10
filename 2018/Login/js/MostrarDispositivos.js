$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {

        firebase.database().ref('DispositivosPermitidos')
            .once('value').then(MostrarDatos);

    });
    $('.collapsible').collapsible();
});

function MostrarDatos(datos) {
    Dispositivos = datos.val();
    $.each(Dispositivos, function (indice, valor) {
        var mostrar = '<tr class="collection-item">';
        mostrar += '<td class="center-align">';
        mostrar += '<p>' + valor.nombre + '</p>';
        mostrar += '</td>';
        mostrar += '<td class="right-align">';
        mostrar += '<a class="waves-effect waves-light btn red" onclick="borrarProducto(\'' + indice + '\')"><i class="material-icons">close</i></a>';
        mostrar += '</td>';
        mostrar += '</tr>';
        $(mostrar).appendTo("#listaDispositivos");
    });
}
function borrarProducto(id) {
    var user = firebase.auth().currentUser;
    if (confirm("¿Está seguro/a de que quiere borrar este artículo?") == true) {
        firebase.database().ref('DispositivosPermitidos')
            .child(id).remove().then(location.reload());
        }
};