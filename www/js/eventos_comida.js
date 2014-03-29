$(document).on('ready', function(){
	$.loader({className:"animated-loader", content:""});
	init();
});

function init() {
    requestService("http://push2party.herokuapp.com/items/by_parent_id_with_children.json", "GET", {parent_id: 4}, success, fail);
}

function success(data){
    $.each( data, function( i, item ) {
           $("#comida_list").append("<a href='#' id='" + item.id + "'><li class='comida'>"+ item.description + "</li></a>");
           if (item.children.length > 0){
              $("#"+item.id).on('click', function(){
                modalDialogueCompras(item.description, item.children);
              });
           }
    });
    $("#jquery-loader-background").remove();
    $("#jquery-loader").remove();
}

function fail(error){
    alert(error);
}
