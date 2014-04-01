$(document).on('ready', function(){
	$.loader({className:"animated-loader", content:""});
    init();
	setTimeout(function() { 
		$("#jquery-loader-background").remove();
		$("#jquery-loader").remove(); 
	}, 1000);
});

function init() {
    $("#envia_mensaje").on('click', openEmailClient);
}

function openEmailClient() {
    window.location.href = "mailto:pushtoparty@gmail.com?subject=Contacto push2party";
}