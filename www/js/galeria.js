$(document).on('ready', function(){
               $.loader({className:"animated-loader", content:""});
               init();
});

function init() {
    requestService(HOST + "galleries.json", "GET", null, success, fail);
}

function success(data){
    $.each( data, function( i, item ) {
           var lugarStr = "<article class='lugar'><p class='h3'>" + item.name + "</p>";
           $.each( item.gallery_images, function( j, image ) {
                lugarStr += "<a href='" + image.image_url + "' rel='prettyPhoto["+ item.id + "]'><img src='" + image.image_url_thumb + "' alt='" + image.description + "' /></a>";
           });
           lugarStr += "</article>";
           $("#gallery_images").append(lugarStr);
           
    });
    $("a[rel^='prettyPhoto']").prettyPhoto({show_title: false, theme:'light_square', social_tools: false});
    $("#jquery-loader-background").remove();
    $("#jquery-loader").remove();
}

function fail(error){
    $("#jquery-loader-background").remove();
    $("#jquery-loader").remove();
    alert(error);
}
