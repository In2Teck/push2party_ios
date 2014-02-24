$(document).on('ready', function(){
	$.loader({className:"animated-loader", content:""});
	init();
});
var backHistory;


function init() {
    $("#btn_enviar").on('click', sendData);
    populateItems();
    populateUser();
    backHistory = history.length;
    $("#jquery-loader-background").remove();
    $("#jquery-loader").remove();
}

function openModal(){
    contactDialogue("INGRESA TUS DATOS PARA COMUNICARNOS CONTIGO", {focus:false});
}

function eraseData(){
    showConfirm("¿Estás seguro?", "Borrar", seleccionBorrar, "OK, Cancelar")
}

function sendData(){
    var verified = verifyFields();
    if (verified.status){
        if($("#checkbox_input").is(':checked')){
            var user = {
                firstname: $("#name_input")[0].value,
                phone: $("#telefono_input")[0].value,
                email: $("#email_input")[0].value
            }
            setCache("user", user);
        }
        var orden = {
            nombre: $("#name_input")[0].value,
            email: $("#email_input")[0].value,
            telefono: $("#telefono_input")[0].value,
            compra: getOrInitShoppingVar()
        }
        var order = {
            rp_id: $("#rp_input")[0].value,
            data: JSON.stringify(orden)
        }
        requestService(HOST + "orders.json", "POST", {order: order}, success, fail);
        $.modal.close();
    } else {
        showMessage(verified.message);
    }
}

function verifyFields(){
    var result = {};
    
    if ($("#name_input")[0].value != "" && $("#telefono_input")[0].value != "" && $("#email_input")[0].value != "") {
        if ( !validateEmail($("#email_input")[0].value) ){
            result["status"] = false;
            result["message"] = "El email proporcionado no es válido";
        } else if (!validatePhone($("#telefono_input")[0].value)) {
            result["status"] = false;
            result["message"] = "El teléfono debe contener mínimo 8 números.";
        } else {
            result["status"] = true;
        }
    } else {
        result["status"] = false;
        result["message"] = "Favor de llenar todos los campos.";
    }
    return result;
}


function success(data){
    resetShoppingVar();
    showAlert("Tu cotización ha sido enviada a uno de nuestros representantes, nos comunicaremos contigo a la brevedad posible.", "Cotización exitosa", "Continuar", redirectSponsor);
}

function redirectSponsor(){
    window.location.href = 'sponsor2.html';
}

function fail(error){
    showMessage("El pedido no se pudo guardar, por favor intenta nuevamente más tarde.");
}

function seleccionBorrar(buttonIndex){
    if(buttonIndex == 1){
        resetShoppingVar();
        window.location.href = 'menu.html';
    }
}

function populateUser(){
    if(isCache("user")){
        user = getCache("user");
        $("#name_input")[0].value = user.firstname;
        $("#email_input")[0].value = user.email;
        $("#telefono_input")[0].value = user.phone;
    }
}

function populateItems(){
    var shopping = getOrInitShoppingVar();
    var total = 0;
    $.each(shopping.paquetes, function(value, key){
        if (key.quantity > 0) {
           //$("#articulos").append("<p>" + key.description + "</p>");
           //$("#cantidad").append("<p>" + key.quantity + "</p>");
           total += key.quantity * key.price;
        }
    });
    $.each(shopping.items, function(value, key){
        if (key.quantity > 0) {
           //$("#articulos").append("<p>" + key.description + "</p>");
           //$("#cantidad").append("<p>" + key.quantity + "</p>");
           total += key.quantity * key.price;
        }
    });
    
    if (total >0){
        $("#cotizacion").append("<div id='articulos'><p class='h2 col'>PRODUCTO</p></div><div id='cantidad'><p class='h2'>CANTIDAD</p></div>");
        
        $.each(shopping.paquetes, function(value, key){
	        if (key.quantity > 0) {
	           $("#articulos").append("<p>" + key.description + "</p>");
	           $("#cantidad").append("<p>" + key.quantity + "</p>");
	           total += key.quantity * key.price;
	        }
	    });
	    $.each(shopping.items, function(value, key){
	        if (key.quantity > 0) {
	           $("#articulos").append("<p>" + key.description + "</p>");
	           $("#cantidad").append("<p>" + key.quantity + "</p>");
	           total += key.quantity * key.price;
	        }
	    });
	    
	    $("#articulos").append("<br/><p>TOTAL</p>");
        $("#cantidad").append("<br/><p>$ "+ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"</p>");
        
        $(".action_buttons").append("<a href='#' class='btn_confirmar' id='btn_confirmar'></a>");
        $(".action_buttons").append("<a href='#' class='btn_borrar' id='btn_borrar'></a>");
        $("#btn_confirmar").on('click', openModal);
        $("#btn_borrar").on('click', eraseData);
    } else {
        $(".action_buttons").append("<p style='text-align: center; font-size: 1.5em;'>Aún no agregas nada, <br/>te invitamos a crear tu evento <br/> o a visitar la sección de paquetes.</p>");
    }
}
