$(document).on('ready', init);

function init() {
    requestService("http://push2party.herokuapp.com/items/by_parent_id_with_children.json", "GET", {parent_id: 2}, success, fail);
}

function success(data){
    $.each( data, function( i, item ) {
           $("#bebidas_list").append("<a href='#' id='" + item.id + "'><li class='alcohol'>"+ item.description + "</li></a>");
           if (item.children.length > 0){
              $("#"+item.id).on('click', function(){
                modalDialogue(item.description, item.children);
              });
           }
    });
}

function fail(error){
    alert(error);
}