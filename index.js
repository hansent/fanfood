var mongoose = require ("mongoose"); 
var express = require('express');
var app = express();


mongoose.connect(process.env.MONGOLAB_URI, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + process.env.MONGOLAB_URI + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + process.env.MONGOLAB_URI);
  }
});


var User = mongoose.model('User', { 
    phone: String,
    seat: String,
    messages: [{ 
        text: String, 
        time: { type: Date, default: Date.now },
        done: Boolean 
    }],

});



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/api/post_message', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
