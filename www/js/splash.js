$(document).on('ready', init);

function init() {
    $("#boton_aceptar").on('click', addUser);
    setTimeout(checkConnection, 500);
}

function addUser(){
    var verified = verifyFields();
    if (verified.status){
        var user = {
            firstname: $("#nombre")[0].value,
            lastname: $("#apellido")[0].value,
            phone: $("#telefono")[0].value,
            email: $("#mail")[0].value
        }
        requestService(HOST + "users.json", "POST", {user: user}, success, fail);
    } else {
        showMessage(verified.message);
    }
}

function success(data){
    setCache("user", data);
    window.location.href = 'menu.html';
}

function fail(error){
    showMessage("Los datos no se pudieron guardar, por favor intenta nuevamente más tarde.");
}

function verifyFields(){
    var result = {};
    
    if ($("#nombre")[0].value != "" && $("#apellido")[0].value != "" && $("#telefono")[0].value != "" && $("#mail")[0].value != "") {
        if ( !validateEmail($("#mail")[0].value) ){
            result["status"] = false;
            result["message"] = "El email proporcionado no es válido";
        } else if (!validatePhone($("#telefono")[0].value)) {
            result["status"] = false;
            result["message"] = "El teléfono proporcionado debe contener mínimo 8 números.";
        } else {
            result["status"] = true;
        }
    } else {
        result["status"] = false;
        result["message"] = "Favor de llenar todos los campos.";
    }
    return result;
}