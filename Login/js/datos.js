$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Conetado');
        } else {
            console.log('Usuario No Logeado');
            location.assign('login.html');
        }
    });
        
    $('#btnDatos').click(function () {
        var nombre = $('#nombre').val();
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: nombre
        }).then(function(){

            location.assign("index.html");
            
        }).catch(function (error) {
            alert("Error" + error);
            
        });
    });
    
    
});