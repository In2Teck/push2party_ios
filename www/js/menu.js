var link;

$(document).on('ready', init);

function init() {
    $("#btn_menu").on('click', btnMenu);
    $("#btn_crea_evento").on('click', btnEventos);
    $("#btn_galeria").on('click', btnGaleria);
    $("#btn_beneficios").on('click', btnBeneficios);
    $("#btn_paquetes").on('click', btnPaquetes);
    $("#btn_contacto").on('click', btnContacto);
    displayMenuLabel("");
    link = "";
}

function btnMenu(){
    if (link != ""){
        window.location.href = './' + link;
    }
}

function btnEventos(){
    displayMenuLabel("CREA TU EVENTO");
    link = "eventos.html";
}

function btnGaleria(){
    displayMenuLabel("GALERIA");
    link = "galeria.html";
}

function btnBeneficios(){
    displayMenuLabel("BENEFICIOS");
    link = "beneficios.html";
}

function btnPaquetes(){
    displayMenuLabel("PAQUETES");
    link = "paquetes.html";
}

function btnContacto(){
    displayMenuLabel("CONTACTO");
    link = "contacto.html";
}

function displayMenuLabel(label){
    $("#menu_label")[0].innerHTML = label;
}