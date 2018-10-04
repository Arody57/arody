$(document).ready(function () {
    var Dispositivos = {};
    firebase.auth().onAuthStateChanged(function (user) {

        var user = firebase.auth().currentUser;
        firebase.database().ref('DispositivosPermitidos')
            .once('value').then(function (datos) {
                Dispositivos = datos.val();
                $.each(Dispositivos, function (indice, valor) {
                    var mostrar = '<option value="' + valor.nombre + '">' + valor.nombre + '</option>';
                    $(mostrar).appendTo("#listaDispositivos");
                });
            });

    });


    $('#listaDispositivos').change(function () {
        var nombre = $('#listaDispositivos').val();

        if (nombre == "CPU" || nombre == "Laptop") {
            $('#nuevotext').css('display', 'block');
            $('#proceso').focus()
        } else if (nombre != "CPU" || nombre != "Laptop") {
            $('#nuevotext').css('display', 'none');
        };

        if (nombre == "Monitor") {
            $('#newtext').css('display', 'block');
            $('#Resolucion1').focus()

        } else if (nombre != "Monitor") {
            $('#newtext').css('display', 'none');
        };

        if (nombre == "Teclado") {
            $('#Marca').focus()
        }

        if (nombre == "Mouse") {
            $('#Marca').focus()
        }

        if (nombre == "Telefono") {
            $('#Telefono').css('display', 'block');
            $('#sistemaOp').focus()
        } else if (nombre != "Telefono") {
            $('#Telefono').css('display', 'none');
        };

    });


    $('#guardarDis').click(function () {
        var cad;
        var f = new Date();
        cad = f.getDay()+ "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + " - " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();

        var nombre = $('#listaDispositivos').val();
        var marca = $('#Marca').val();
        var Serial = $('#Serial').val();
        var asignacion = $('#AsignacionText').val();
        var Detall;

        if (nombre == 'CPU' || nombre == 'Laptop') {
            var proces = $('#proceso').val();
            var ram = $('#ram').val();
            var discoduro = $('#discoduro').val();

            Detall = {
                Procesador: proces,
                RAM: ram,
                Disco_Duro: discoduro
            };

        } else if (nombre == 'Monitor') {
            var resolucion = $('#Resolucion1').val();
            Detall = {
                resolucion: resolucion
            };

        } else if (nombre == 'Telefono') {
            var sistemaOp = $('#sistemaOp').val();
            var versionOp = $('#versionOp').val();
            var modeloDisp = $('#modeloDisp').val();
            var cpuDisp = $('#cpuDisp').val();
            Detall = {
                sistemaOp: sistemaOp,
                versionOp: versionOp,
                modeloDisp: modeloDisp,
                cpuDisp: cpuDisp
            };
        }else {
            Detall = {};
        }

        var user = firebase.auth().currentUser;

        var Datos = {
            Nombre: nombre,
            Marca: marca,
            Serial: Serial,
            Asignacion: asignacion,
            Fecha: cad,
            Detalles: Detall
        };

        firebase.database().ref('Usuario/' + user.uid + '/Dispositivos')
            .push(Datos);

        $('[type = text]').val("");

        M.toast({
            html: 'Datos Guardados'
        });
    });

});