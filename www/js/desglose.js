$(document).on('ready', init);

function init() {
    $("#btn_confirmar").on('click', openModal);
    $("#btn_borrar").on('click', eraseData);
    populateItems();
}

function openModal(){
    contactDialogue("INGRESA TUS DATOS PARA COMUNICARNOS CONTIGO");
}

function eraseData(){
    showConfirm("¿Estás seguro?", "Borrar", seleccionBorrar, "OK, Cancelar")
}

function seleccionBorrar(buttonIndex){
    if(buttonIndex == 1){
        resetShoppingVar();
        window.location.href = 'desglose.html';
    }
}

function populateItems(){
    var shopping = getOrInitShoppingVar();
    var total = 0;
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
    
    if (total >0){
        $("#articulos").append("<br/><p>TOTAL</p>");
        $("#cantidad").append("<br/><p>$ "+ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"</p>");
    }
}