$(document).ready(function () {

    var usarios = {};
    var Dispositivos_Usuarios = {};

    firebase.auth().onAuthStateChanged(function (user) {

        firebase.database().ref('Usuario')
            .once('value').then(function (datos) {
                usarios = datos.val();

                $.each(usarios, function (indice, valor) {
                    var mostrar = '<li class="colap">';
                    mostrar += '<div class="collapsible-header">';
                    mostrar += '<div class="row acordeon">';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Usuario: </b>' + valor.Cuenta.Nombre + '</p>';
                    mostrar += '</div>';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Correo : </b>' + valor.Cuenta.Correo + ' </p>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '<div class="collapsible-body" id="Dis_usuario">';

                    firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                        .once('value').then(function (datos2) {

                            Dispositivos_Usuarios = datos2.val();

                            $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                mostrar += '<p><b>Nombre: </b>' + valor2.Nombre + '</p>';
                                mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                if (valor2.Detalles.Procesador != null) {
                                    mostrar += '<div class="detalles_Acor">';
                                    mostrar += '<p>Detalles:</p>';
                                    mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                    mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                    mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                    mostrar += '</div>';
                                };
                                mostrar += '<hr>';
                            });
                            mostrar += '</div>';
                            mostrar += '</li>';
                            $(mostrar).appendTo('#Usuarios_Todo');
                        });
                });
            });

    });
    $('.collapsible').collapsible();

    $('#BusEmpresa').click(function () {
        $("#Usuarios_Todo li.colap").remove();

        firebase.database().ref('Usuario')
            .once('value').then(function (datos) {
                usarios = datos.val();

                $.each(usarios, function (indice, valor) {
                    var mostrar = '<li class="colap">';
                    mostrar += '<div class="collapsible-header">';
                    mostrar += '<div class="row acordeon">';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Usuario: </b>' + valor.Cuenta.Nombre + '</p>';
                    mostrar += '</div>';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Correo : </b>' + valor.Cuenta.Correo + ' </p>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '<div class="collapsible-body" id="Dis_usuario">';

                    firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                        .once('value').then(function (datos2) {

                            Dispositivos_Usuarios = datos2.val();

                            $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                if (valor2.Asignacion == "Empresa") {
                                    mostrar += '<p><b>Nombre: </b>' + valor2.Nombre + '</p>';
                                    mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                    mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                    mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                    if (valor2.Detalles.Procesador != null) {
                                        mostrar += '<div class="detalles_Acor">';
                                        mostrar += '<p>Detalles:</p>';
                                        mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                        mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                        mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                        mostrar += '</div>';
                                    };
                                    mostrar += '<hr>';
                                };
                            });
                            mostrar += '</div>';
                            mostrar += '</li>';
                            $(mostrar).appendTo('#Usuarios_Todo');
                        });
                });
            });
    });

    $('#BusPropio').click(function () {
        $("#Usuarios_Todo li.colap").remove();

        firebase.database().ref('Usuario')
            .once('value').then(function (datos) {
                usarios = datos.val();

                $.each(usarios, function (indice, valor) {
                    var mostrar = '<li class="colap">';
                    mostrar += '<div class="collapsible-header">';
                    mostrar += '<div class="row acordeon">';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Usuario: </b>' + valor.Cuenta.Nombre + '</p>';
                    mostrar += '</div>';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Correo : </b>' + valor.Cuenta.Correo + ' </p>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '<div class="collapsible-body" id="Dis_usuario">';

                    firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                        .once('value').then(function (datos2) {

                            Dispositivos_Usuarios = datos2.val();

                            $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                if (valor2.Asignacion == "Propio") {
                                    mostrar += '<p><b>Nombre: </b>' + valor2.Nombre + '</p>';
                                    mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                    mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                    mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                    if (valor2.Detalles.Procesador != null) {
                                        mostrar += '<div class="detalles_Acor">';
                                        mostrar += '<p>Detalles:</p>';
                                        mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                        mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                        mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                        mostrar += '</div>';
                                    };
                                    mostrar += '<hr>';
                                };
                            });
                            mostrar += '</div>';
                            mostrar += '</li>';
                            $(mostrar).appendTo('#Usuarios_Todo');
                        });
                });
            });
    });

    $('#BusTodo').click(function () {
        $("#Usuarios_Todo li.colap").remove();


        firebase.database().ref('Usuario')
            .once('value').then(function (datos) {
                usarios = datos.val();

                $.each(usarios, function (indice, valor) {
                    var mostrar = '<li class="colap">';
                    mostrar += '<div class="collapsible-header">';
                    mostrar += '<div class="row acordeon">';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Usuario: </b>' + valor.Cuenta.Nombre + '</p>';
                    mostrar += '</div>';
                    mostrar += '<div class="col">';
                    mostrar += '<p><b>Correo : </b>' + valor.Cuenta.Correo + ' </p>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '</div>';
                    mostrar += '<div class="collapsible-body" id="Dis_usuario">';

                    firebase.database().ref('Usuario/' + indice + '/Dispositivos')
                        .once('value').then(function (datos2) {

                            Dispositivos_Usuarios = datos2.val();

                            $.each(Dispositivos_Usuarios, function (indice2, valor2) {
                                mostrar += '<p><b>Nombre: </b>' + valor2.Nombre + '</p>';
                                mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                if (valor2.Detalles.Procesador != null) {
                                    mostrar += '<div class="detalles_Acor">';
                                    mostrar += '<p>Detalles:</p>';
                                    mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                    mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                    mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                    mostrar += '</div>';
                                };
                                mostrar += '<hr>';
                            });
                            mostrar += '</div>';
                            mostrar += '</li>';
                            $(mostrar).appendTo('#Usuarios_Todo');
                        });
                });
            });
    });

});
