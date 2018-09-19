$(document).ready(function(){
    var Dispositivos = {};
    firebase.auth().onAuthStateChanged(function (user) {

        var user = firebase.auth().currentUser;
        firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            .once('value').then(function(datos){

                Dispositivos = datos.val();
    
                $.each(Dispositivos, function (indice,valor){
                    var mostrar = '<tr><td>' + valor.Nombre + '</td>';
                    mostrar +='<td>' + valor.Serial + '</td>';
                    mostrar +='<td>' + valor.Asignacion + '</td></tr>';
    
                    $(mostrar).appendTo('#Dispositivos');
                });
    
            });
    });

});