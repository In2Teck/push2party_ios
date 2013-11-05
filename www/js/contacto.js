$(document).on('ready', init);

function init() {
    $("#envia_mensaje").on('click', openModal);
}

function openModal(){
    messageDialogue("¿Tienes dudas o sugerencias? Envíanos un mensaje");
}