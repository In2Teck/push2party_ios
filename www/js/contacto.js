var facebook;
var twitter;
var instagram;
var whatsapp;

function face(){facebook = true;}
function twit(){twitter = true;}
function insta(){instagram = true;}
function whats(){whatsapp = true;}
function check(){
	var all_loaded = (facebook && twitter && instagram && whatsapp);
	if(all_loaded){
		$("#jquery-loader-background").remove();
		$("#jquery-loader").remove();
	}
}

$(document).on('ready', function(){
	facebook = false;
	twitter = false;
	instagram = false;
	whatsapp = false;
	
	$.loader({className:"animated-loader", content:""});
    init(); 
});

function init() {
    $("#envia_mensaje").on('click', openEmailClient);
}

function openEmailClient() {
    window.location.href = "mailto:pushtoparty@gmail.com?subject=Contacto push2party";
}