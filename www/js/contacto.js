$(document).on('ready', init);

function init() {
    $("#envia_mensaje").on('click', openEmailClient);
}

function openEmailClient() {
    //messageDialogue("¿Tienes dudas o sugerencias? Envíanos un mensaje");
    window.location.href = "mailto:pushtoparty@gmail.com?subject=Contacto push2party";
}