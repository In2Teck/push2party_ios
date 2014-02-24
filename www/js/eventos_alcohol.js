$(document).on('ready', function(){
	$.loader({className:"animated-loader", content:""});
	init();
});

function init() {
    requestService(HOST + "items/by_parent_id_with_children.json", "GET", {parent_id: 1}, success, fail);
}


function success(data){
    $.each( data, function( i, item ) {
           $("#alcohol_list").append("<a href='#' id='" + item.id + "'><li class='alcohol'>"+ item.description + "</li></a>");
           if (item.children.length > 0){
              $("#"+item.id).on('click', function(){
                modalDialogue(item.description, item.children);
              });
           }
    });
    $("#jquery-loader-background").remove();
    $("#jquery-loader").remove();
}

function fail(error){
    alert(error);
}
