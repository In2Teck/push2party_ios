$(document).on('ready', init);

function init() {

    $('.btn_agregar').on('click', addToCart);
    $('#carousel').jcarousel({
      scroll: 1,
      visible: 1,
      initCallback: carousel_initCallback,
      buttonNextHTML: null,
      buttonPrevHTML: null
    });
    
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
    
}

function addToCart(){

    $('.btn_agregar').css("background-image", "url('img/btn_agregar_seleccionado.png')");
    setTimeout(function(){
        $('#shopping').css("background-image", "url('img/carrito_seleccionado.png')");
        $('.btn_agregar').css("background-image", "url('img/btn_agregar.png')");
        setTimeout(function(){
            $('#shopping').css("background-image", "url('img/carrito.png')");
        }, 200);
    }, 200);
}