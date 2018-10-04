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

        firebase.database().ref('Usuario')
            .once('value').then(function (datos) {
                $("#Usuarios_Todo li.colap").remove();

                usuarios = datos.val();

                $.each(usuarios, function (indice, valor) {
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

                                mostrar += '<p><b>Dispositivo: </b>' + valor2.Nombre + '</p>';
                                mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                if (valor2.Detalles != null) {
                                    if (valor2.Nombre == "CPU" || valor2.Nombre == "Laptop") {
                                        mostrar += '<div class="detalles_Acor">';
                                        mostrar += '<p>Detalles:</p>';
                                        mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                        mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                        mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                        mostrar += '</div>';
                                    } else if (valor2.Nombre == "Telefono") {
                                        mostrar += '<div class="detalles_Acor">';
                                        mostrar += '<p>Detalles:</p>';
                                        mostrar += '<p><b>CPU: </b>' + valor2.Detalles.cpuDisp + '</p>';
                                        mostrar += '<p><b>Modelo del Dispositivo: </b>' + valor2.Detalles.modeloDisp + '</p>';
                                        mostrar += '<p><b>Sistema Operativo: </b>' + valor2.Detalles.sistemaOp + '</p>';
                                        mostrar += '<p><b>Version del Sistema Operativo: </b>' + valor2.Detalles.versionOp + '</p>';
                                        mostrar += '</div>';
                                    } else if (valor2.Nombre == "Monitor") {
                                        mostrar += '<div class="detalles_Acor">';
                                        mostrar += '<p>Detalles:</p>';
                                        mostrar += '<p><b>CPU: </b>' + valor2.Detalles.resolucion + '</p>';
                                        mostrar += '</div>';
                                    }
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
        var comboBox = $('#listaDispositivos').val();
        if (comboBox != null) {
            $("#Usuarios_Todo li.colap").remove();

            firebase.database().ref('Usuario')
                .once('value').then(function (datos) {

                    usuariosDis = datos.val();

                    $.each(usuariosDis, function (indice, valor) {
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

                                    if (valor2.Nombre == comboBox) {
                                        if (valor2.Asignacion == "Empresa") {

                                            mostrar += '<p><b>Dispositivo: </b>' + valor2.Nombre + '</p>';
                                            mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                            mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                            mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                            if (valor2.Detalles != null) {
                                                if (valor2.Nombre == "CPU" || valor2.Nombre == "Laptop") {
                                                    mostrar += '<div class="detalles_Acor">';
                                                    mostrar += '<p>Detalles:</p>';
                                                    mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                                    mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                                    mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                                    mostrar += '</div>';
                                                } else if (valor2.Nombre == "Telefono") {
                                                    mostrar += '<div class="detalles_Acor">';
                                                    mostrar += '<p>Detalles:</p>';
                                                    mostrar += '<p><b>CPU: </b>' + valor2.Detalles.cpuDisp + '</p>';
                                                    mostrar += '<p><b>Modelo del Dispositivo: </b>' + valor2.Detalles.modeloDisp + '</p>';
                                                    mostrar += '<p><b>Sistema Operativo: </b>' + valor2.Detalles.sistemaOp + '</p>';
                                                    mostrar += '<p><b>Version del Sistema Operativo: </b>' + valor2.Detalles.versionOp + '</p>';
                                                    mostrar += '</div>';
                                                } else if (valor2.Nombre == "Monitor") {
                                                    mostrar += '<div class="detalles_Acor">';
                                                    mostrar += '<p>Detalles:</p>';
                                                    mostrar += '<p><b>CPU: </b>' + valor2.Detalles.resolucion + '</p>';
                                                    mostrar += '</div>';
                                                }
                                            };
                                            mostrar += '<hr>';
                                        };
                                    };
                                });
                                mostrar += '</div>';
                                mostrar += '</li>';

                                $(mostrar).appendTo('#Usuarios_Todo');

                            });
                    });
                });
        } else {
            alert('Elegir un Dispositivo');
        }
    });

    $('#BusPropio').click(function () {
        var comboBox = $('#listaDispositivos').val();
        if (comboBox != null) {
            $("#Usuarios_Todo li.colap").remove();

            firebase.database().ref('Usuario')
                .once('value').then(function (datos) {

                    usuariosDis = datos.val();

                    $.each(usuariosDis, function (indice, valor) {
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

                                    if (valor2.Nombre == comboBox) {
                                        if (valor2.Asignacion == "Propio") {

                                            mostrar += '<p><b>Dispositivo: </b>' + valor2.Nombre + '</p>';
                                            mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                            mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                            mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                            if (valor2.Detalles != null) {
                                                if (valor2.Nombre == "CPU" || valor2.Nombre == "Laptop") {
                                                    mostrar += '<div class="detalles_Acor">';
                                                    mostrar += '<p>Detalles:</p>';
                                                    mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                                    mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                                    mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                                    mostrar += '</div>';
                                                } else if (valor2.Nombre == "Telefono") {
                                                    mostrar += '<div class="detalles_Acor">';
                                                    mostrar += '<p>Detalles:</p>';
                                                    mostrar += '<p><b>CPU: </b>' + valor2.Detalles.cpuDisp + '</p>';
                                                    mostrar += '<p><b>Modelo del Dispositivo: </b>' + valor2.Detalles.modeloDisp + '</p>';
                                                    mostrar += '<p><b>Sistema Operativo: </b>' + valor2.Detalles.sistemaOp + '</p>';
                                                    mostrar += '<p><b>Version del Sistema Operativo: </b>' + valor2.Detalles.versionOp + '</p>';
                                                    mostrar += '</div>';
                                                } else if (valor2.Nombre == "Monitor") {
                                                    mostrar += '<div class="detalles_Acor">';
                                                    mostrar += '<p>Detalles:</p>';
                                                    mostrar += '<p><b>CPU: </b>' + valor2.Detalles.resolucion + '</p>';
                                                    mostrar += '</div>';
                                                }
                                            };
                                            mostrar += '<hr>';
                                        };
                                    };
                                });
                                mostrar += '</div>';
                                mostrar += '</li>';

                                $(mostrar).appendTo('#Usuarios_Todo');

                            });
                    });
                });
        } else {
            alert('Elegir un Dispositivo');
        }
    });

    $('#BusTodo').click(function () {
        var comboBox = $('#listaDispositivos').val();
        if (comboBox != null) {
        $("#Usuarios_Todo li.colap").remove();
        firebase.database().ref('Usuario')
            .once('value').then(function (datos) {
                firebase.database().ref('Usuario')
                    .once('value').then(function (datos) {
                        $("#Usuarios_Todo li.colap").remove();

                        usuarios = datos.val();

                        $.each(usuarios, function (indice, valor) {
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
                                        if (valor2.Nombre == comboBox) {
                                        
                                        mostrar += '<p><b>Dispositivo: </b>' + valor2.Nombre + '</p>';
                                        mostrar += '<p><b>Serial: </b>' + valor2.Serial + '</p>';
                                        mostrar += '<p><b>Asignacion: </b><u>' + valor2.Asignacion + '</u></p>';
                                        mostrar += '<p><b>Marca: </b>' + valor2.Marca + '</p>';
                                        if (valor2.Detalles != null) {
                                            if (valor2.Nombre == "CPU" || valor2.Nombre == "Laptop") {
                                                mostrar += '<div class="detalles_Acor">';
                                                mostrar += '<p>Detalles:</p>';
                                                mostrar += '<p><b>Procesador: </b>' + valor2.Detalles.Procesador + '</p>';
                                                mostrar += '<p><b>RAM: </b>' + valor2.Detalles.RAM + '</p>';
                                                mostrar += '<p><b>Disco Duro: </b>' + valor2.Detalles.Disco_Duro + '</p>';
                                                mostrar += '</div>';
                                            } else if (valor2.Nombre == "Telefono") {
                                                mostrar += '<div class="detalles_Acor">';
                                                mostrar += '<p>Detalles:</p>';
                                                mostrar += '<p><b>CPU: </b>' + valor2.Detalles.cpuDisp + '</p>';
                                                mostrar += '<p><b>Modelo del Dispositivo: </b>' + valor2.Detalles.modeloDisp + '</p>';
                                                mostrar += '<p><b>Sistema Operativo: </b>' + valor2.Detalles.sistemaOp + '</p>';
                                                mostrar += '<p><b>Version del Sistema Operativo: </b>' + valor2.Detalles.versionOp + '</p>';
                                                mostrar += '</div>';
                                            } else if (valor2.Nombre == "Monitor") {
                                                mostrar += '<div class="detalles_Acor">';
                                                mostrar += '<p>Detalles:</p>';
                                                mostrar += '<p><b>CPU: </b>' + valor2.Detalles.resolucion + '</p>';
                                                mostrar += '</div>';
                                            }
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
        }else {
            alert('Elegir un Dispositivo');
        }
    });

});