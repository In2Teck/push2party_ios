$(document).on('ready', init);

function init() {
    $("#btn_confirmar").on('click', openModal);
}

function openModal(){
    contactDialogue("INGRESA TUS DATOS PARA COMUNICARNOS CONTIGO");
}