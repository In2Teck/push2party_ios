$(document).on('ready', init);

function init() {
    $("#boton_aceptar").on('click', addUser);
    $("#boton_omitir").on('click', skip);
    setTimeout(checkConnection, 500);
}

function skip(){
    window.location.href = 'menu.html';
}

function addUser(){
    var verified = verifyFields();
    
    if (verified.status){
        var idx = $("#lista_genero")[0].selectedIndex;
        var content = $("#lista_genero")[0].options[idx].innerHTML;
        
        var user = {
            firstname: $("#nombre")[0].value,
            phone: $("#telefono")[0].value,
            email: $("#email")[0].value,
            gender: content,
            dob: $("#fecha_input")
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
    
    if ($("#nombre")[0].value != "" && $("#telefono")[0].value != "" && $("#email")[0].value != "") {
        if ( !validateEmail($("#email")[0].value) ){
            result["status"] = false;
            result["message"] = "El email proporcionado no es válido";
        } else if (!validatePhone($("#telefono")[0].value)) {
            result["status"] = false;
            result["message"] = "El teléfono proporcionado debe contener mínimo 8 números.";
        } else if (!validateDate($("#fecha_input")[0].value)) {
            result["status"] = false;
            result["message"] = "La fecha no es válida.";
        }else {
            result["status"] = true;
        }
    } else {
        result["status"] = false;
        result["message"] = "Favor de llenar todos los campos.";
    }
    return result;
}