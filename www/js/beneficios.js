$(document).on('ready', init);

function init() {
    requestService(HOST + "coupons.json", "GET", null, success, fail);
}


function success(data){
    $.each( data, function( i, item ) {
           $(".promociones").append("<a href='" + item.image_url + "' rel='prettyPhoto[beneficios]'><img src='" + item.image_url_thumb + "' alt='" + item.name + "' /></a>");
    });
    $("a[rel^='prettyPhoto']").prettyPhoto({show_title: false, theme:'light_square', social_tools: false});
}

function fail(error){
    alert(error);
}