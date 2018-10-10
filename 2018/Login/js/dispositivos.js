var usuarios = {};
var usuariosDis = {};
var Dispositivos_Usuarios = {};

$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (user) {

        firebase.database().ref('DispositivosPermitidos')
            .once('value').then(function (datos) {

                Dispositivos = datos.val();
                $.each(Dispositivos, function (indice, valor) {
                    var mostrar = '<option value="' + valor.nombre + '">' + valor.nombre + '</option>';
                    $(mostrar).appendTo("#listaDispositivos");
                });
            });
        $("#Usuarios_Todo tr").remove();

        firebase.database().ref('Usuario')
            .once('value').then(function (datos) {

                usuarios = datos.val();

                $.each(usuarios, function (indice, valor) {

                    firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                        .once('value').then(function (datos2) {

                            Dispositivos_Usuarios = datos2.val();

                            $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                var mostrar = '<tr>';
                                mostrar += '<td><p>' + valor.Cuenta.Nombre + '</p></td>';
                                mostrar += '<td><p>' + valor.Cuenta.Correo + '</p></td>';
                                mostrar += '<td><p>' + valor2.Nombre + '</p></td>';
                                mostrar += '<td><i class="material-icons">personal_video</i><p>' + valor2.Asignacion + '</p></td>';
                                mostrar += '</tr>';
                                $(mostrar).appendTo('#Usuarios_Todo');
                            });
                        });
                });
            });

        $('.collapsible').collapsible();

    });

    $('#BusEmpresa').click(function () {
        var combo = $('#listaDispositivos').val();

        if (combo != null) {
            
            $("#Usuarios_Todo tr").remove();

            firebase.database().ref('Usuario')
                .once('value').then(function (datos) {

                    usuarios = datos.val();

                    $.each(usuarios, function (indice, valor) {

                        firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                            .once('value').then(function (datos2) {

                                Dispositivos_Usuarios = datos2.val();

                                $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                    var mostrar = '<tr>';
                                    mostrar += '<td><p>' + valor.Cuenta.Nombre + '</p></td>';
                                    mostrar += '<td><p>' + valor.Cuenta.Correo + '</p></td>';
                                    mostrar += '<td><p>' + valor2.Nombre + '</p></td>';
                                    mostrar += '<td><i class="material-icons">personal_video</i><p>' + valor2.Asignacion + '</p></td>';
                                    mostrar += '</tr>';
                                    if (valor2.Nombre == combo) {
                                        if (valor2.Asignacion == "Empresa") {
                                            $(mostrar).appendTo('#Usuarios_Todo');
                                            console.log("EXITOSO" + combo);
                                        }
                                    };
                                });
                            });
                    });
                });
        } else {
            M.toast({
                html: 'Elegir Dispositivo'
            });
        }
    });

    $('#BusPropio').click(function () {
        var combo = $('#listaDispositivos').val();

        if (combo != null) {

            $("#Usuarios_Todo tr").remove();

            firebase.database().ref('Usuario')
                .once('value').then(function (datos) {

                    usuarios = datos.val();

                    $.each(usuarios, function (indice, valor) {

                        firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                            .once('value').then(function (datos2) {

                                Dispositivos_Usuarios = datos2.val();

                                $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                    var mostrar = '<tr>';
                                    mostrar += '<td><p>' + valor.Cuenta.Nombre + '</p></td>';
                                    mostrar += '<td><p>' + valor.Cuenta.Correo + '</p></td>';
                                    mostrar += '<td><p>' + valor2.Nombre + '</p></td>';
                                    mostrar += '<td><i class="material-icons">personal_video</i><p>' + valor2.Asignacion + '</p></td>';
                                    mostrar += '</tr>';
                                    if (valor2.Nombre == combo) {
                                        if (valor2.Asignacion == "Propio") {
                                            $(mostrar).appendTo('#Usuarios_Todo');
                                            console.log("EXITOSO" + combo);
                                        }
                                    };
                                });
                            });
                    });
                });
        } else {
            M.toast({
                html: 'Elegir Dispositivo'
            });

        }

    });

    $('#BusTodo').click(function () {

        
        var combo = $('#listaDispositivos').val();
        
        if (combo != null) {
            
            $("#Usuarios_Todo tr").remove();

            firebase.database().ref('Usuario')
                .once('value').then(function (datos) {

                    usuarios = datos.val();

                    $.each(usuarios, function (indice, valor) {

                        firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                            .once('value').then(function (datos2) {

                                Dispositivos_Usuarios = datos2.val();

                                $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                    var mostrar = '<tr>';
                                    mostrar += '<td><p>' + valor.Cuenta.Nombre + '</p></td>';
                                    mostrar += '<td><p>' + valor.Cuenta.Correo + '</p></td>';
                                    mostrar += '<td><p>' + valor2.Nombre + '</p></td>';
                                    mostrar += '<td><i class="material-icons">personal_video</i><p>' + valor2.Asignacion + '</p></td>';
                                    mostrar += '</tr>';
                                    if (valor2.Nombre == combo) {
                                        $(mostrar).appendTo('#Usuarios_Todo');
                                        console.log("EXITOSO" + combo);
                                    };
                                });
                            });
                    });
                });
        } else {
            M.toast({
                html: 'Elegir Dispositivo'
            });

        }
    });

});