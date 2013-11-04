var PAQUETES_RANGE_1 = 10; var PAQUETES_RANGE_2 = 91;
var GALERIA_RANGE_1 = 71; var GALERIA_RANGE_2 = 90;
var BENEFICIOS_RANGE_1 = 51; var BENEFICIOS_RANGE_2 = 70;
var CONTACTO_RANGE_1 = 31; var CONTACTO_RANGE_2 = 50;
var EVENTOS_RANGE_1 = 11; var EVENTOS_RANGE_2 = 30;

$(document).on('ready', init);

function init() {
    goPaquetes();
    $(".dial").knob({
        'displayInput': false,
        'width': "620",
        'height': "620",
        'thickness': "0.72",
        'fgColor': "none",
        'bgColor': "none",
        'change' : function (v) {
            $("#menu_img")[0].style.WebkitTransform = "rotate("+v*3.6+"deg)";
            if ( (v <= PAQUETES_RANGE_1 && v >= 0) || (v >= PAQUETES_RANGE_2 && v <= 100) ){
              goPaquetes();
            } else if (v <= GALERIA_RANGE_2 && v >= GALERIA_RANGE_1){
              goGaleria();
            } else if (v <= BENEFICIOS_RANGE_2 && v >= BENEFICIOS_RANGE_1){
              goBeneficios();
            } else if (v <= CONTACTO_RANGE_2 && v >= CONTACTO_RANGE_1 ){
              goContacto();
            } else if (v <= EVENTOS_RANGE_2 && v >= EVENTOS_RANGE_1){
              goEventos();
            }
        }
    });
}

function goEventos(){
    displayMenuLabel("CREA TU EVENTO");
    $("#btn_menu")[0].href = "eventos.html";
}

function goGaleria(){
    displayMenuLabel("GALERIA");
    $("#btn_menu")[0].href = "galeria.html";
}

function goBeneficios(){
    displayMenuLabel("BENEFICIOS");
    $("#btn_menu")[0].href = "beneficios.html";
}

function goPaquetes(){
    displayMenuLabel("PAQUETES");
    $("#btn_menu")[0].href = "paquetes.html";
}

function goContacto(){
    displayMenuLabel("CONTACTO");
    $("#btn_menu")[0].href = "contacto.html";
}

function displayMenuLabel(label){
    $("#menu_label")[0].innerHTML = label;
}