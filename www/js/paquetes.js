$(document).on('ready', function(){
    $.loader({className:"animated-loader", content:""});
    init();
});
var combos = [];

function init() {
    
    requestService(HOST + "combos.json", "GET", null, success, fail);

}

function success(data){
    $.each( data, function( i, item ) {
        var combo = {
           name: item.name,
           price: item.price,
           items: item.description,
           id: item.id,
           image: item.image_url
        };
        combos.push(combo);
    });
    createCombos();
    $("#jquery-loader-background").remove();
    $("#jquery-loader").remove();
}

function carousel_initCallback(carousel) {
    
    $('.btn_next').bind('click', function() {
                        carousel.next();
                        return false;
                        });
    
    $('.btn_prev').bind('click', function() {
                        carousel.prev();
                        return false;
                        });
};

function createCombos(){
    
    $.each(combos, function(i, combo) {
        var classInt = (i + 1)%4 == 0 ? 4 : (i + 1)%4;
        var appendedString = "<li id='paquete_" + (i + 1) + "' class='paquete_" + classInt + "'>";
           var items = combo.items.split(",");
           if (items.length > 8){
              appendedString += "<div class='elementos_compress'>";
           } else {
              appendedString += "<div class='elementos'>";
           }
           $.each(items, function(j, item){
                appendedString += "<p>"+item+"</p>";
           });
           
        appendedString += "</div><div class='descripcion'>";
        appendedString += "<p class='paquete_id'>"+combo.name+"</p><p class='precio'>$"+combo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</p>";
        appendedString += "<a href='#' class='btn_agregar' id='btn_paquete_"+ combo.id +"'></a><br/>";
        appendedString += "<a href='"+combo.image+"' rel='prettyPhoto' >Ver</a></div></li>";

        $("#paquetes_list").append(appendedString);
        $("a[rel^='prettyPhoto']").prettyPhoto({show_title: false, theme:'light_square', social_tools: false});
    });
    $('.btn_agregar').on('click', addToCart);
    
    $('#carousel').jcarousel({
                             scroll: 1,
                             visible: 1,
                             initCallback: carousel_initCallback,
                             buttonNextHTML: null,
                             buttonPrevHTML: null
                             });
}

function fail(error){
    alert(error);
}

function addToCart(){
    
    var paqueteId = this.id.split('_')[2];
    $.each(combos, function(i, combo) {
        if (paqueteId == combo.id) {
           var value = initOrGetValue("paquetes", this.id, combo.price, combo.name);
           setQuantityValue("paquetes", this.id, value.quantity + 1);
        }
    });
    
    $('.btn_agregar').css("background-image", "url('img/btn_agregar_seleccionado.png')");
    setTimeout(function(){
        $('#shopping').css("background-image", "url('img/carrito_seleccionado.png')");
        $('.btn_agregar').css("background-image", "url('img/btn_agregar.png')");
        setTimeout(function(){
            $('#shopping').css("background-image", "url('img/carrito.png')");
        }, 200);
    }, 200);
}