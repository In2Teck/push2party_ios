$(document).on('ready', function(){
    $.loader({className:"animated-loader", content:""});
    init();
});

$(document).on('loadeddata', function(){
    $("#jquery-loader-background").remove();
    $("#jquery-loader").remove();
});

function init() {
    $("#envia_mensaje").on('click', openEmailClient);
}

function openEmailClient() {
    window.location.href = "mailto:pushtoparty@gmail.com?subject=Contacto push2party";
}