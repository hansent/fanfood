// var mongoose = require ("mongoose"); 
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var express = require('express');
var twilio = require('twilio');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//connection intialized when server is started
var db = null;


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    var messages = db.collection('documents');
    messages.find({}).toArray(function(err, docs) {
        res.json(docs);
    });   
});

app.all('/sms', function(req, res) {
    var phone_num = req.body.From;
    var message = req.body.Body;

    var messages = db.collection('documents');
    messages.insert({"user": phone_num, "message": message});

    var resp = new twilio.TwimlResponse();
    resp.message('Thanks for subscribing!');
    res.writeHead(200, {'Content-Type':'text/xml'});
    res.end(resp.toString());
});


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.MONGOLAB_URI, function(err, database) {
  if(err) throw err;
  db = database;
  app.listen(app.get('port'));
});

