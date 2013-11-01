$(document).on('ready', init);

function init() {
    if (isCache("user")){
        window.location.href = 'menu.html';
    }
    $("#boton_aceptar").on('click', addUser);
}

function addUser(){
    if ($("#nombre")[0].value != "" && $("#apellido")[0].value != "" && $("#telefono")[0].value != "" && $("#mail")[0].value != ""){
        var user = {
            nombre: $("#nombre")[0].value,
            apellido: $("#apellido")[0].value,
            telefono: $("#telefono")[0].value,
            mail: $("#telefono")[0].value
        }
        setCache("user", user);
    } else {
        showMessage("Favor de introducir todos los datos");
    }
}