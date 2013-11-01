$(document).on('ready', init);

function init() {
    $("a[rel^='prettyPhoto']").prettyPhoto({show_title: false, theme:'light_square', social_tools: false});
}