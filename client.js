
var $ = require('jquery');
var orderTemplate = require('./templates/order.html');  


function renderOrders(orders){
    for(var i=0; i<orders.length; i++){
        var html = orderTemplate(orders[i]);    
        $('.orders').append( $(html) );
    }
}


function updateOrders(){
    $('.orders').empty();
    $.getJSON( "/orders", function( data ) {
            renderOrders(data);
    });
}


$(function(){
    updateOrders();
    setTimeout(updateOrders, 5000);
});


