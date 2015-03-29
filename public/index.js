
var $ = require('jquery');


function insertMessage(msg){
    var sender =  msg['from'];
    var message_html = "<ul>";
    for (var i = 0; i < msg.messages.length; i++) {
        message_html+= "<li>"+msg.messages[i]+"</li>";
    };
    message_html+= "</ul>";
    var elem = $("<li><h3>"+sender+"</h3>"+message_html+"</li>");
    $('#message-list').append(elem);
}

$.getJSON( "/messages", function( data ) {
    for (var i=0; i<data.length; i++) {
        insertMessage(data[i]);
    };
});


setTimeout(function(){
    window.location.reload();
}, 5000)
