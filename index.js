// var mongoose = require ("mongoose"); 
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var express = require('express');
var twilio = require('twilio');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('mongo_uri', process.env.MONGOLAB_URI);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

var db = null;
mongodb.MongoClient.connect(app.get('mongo_uri'), function(err, database) {
  if(err) throw err;
  db = database;
  app.listen(app.get('port'));
});


app.get('/messages', function(req, res) {
    var messages = db.collection('documents');
    messages.find({}).toArray(function(err, docs) {
        res.json(docs);
    });   
});


app.post('/sms', function(req, res) {
    var phone_num = req.body.From;
    var text = req.body.Body;

    var messages = db.collection('messages');
    messages.update(
        {"from": phone_num},
        {$push: {"messages": text}}, 
        {upsert:true}
    );

    var resp = new twilio.TwimlResponse();
    resp.message("got it! we'll process your order asap :)");
    res.writeHead(200, {'Content-Type':'text/xml'});
    res.end(resp.toString());
});