// var mongoose = require ("mongoose"); 
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var express = require('express');
var twilio = require('twilio');

var browserify = require('browserify-middleware');

browserify.settings({
  ignoreMissing: true,
  insertGlobals: true,
  transform: ['browserify-ejs']
});


var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('mongo_uri', process.env.MONGOLAB_URI);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use('/js/app.js', browserify(__dirname + '/client.js'));

var db = null;
mongodb.MongoClient.connect(app.get('mongo_uri'), function(err, database) {
  if(err) throw err;
  db = database;
  app.listen(app.get('port'));
});


app.get('/orders', function(req, res) {
    var orders = db.collection('messages');
    orders.find({}).toArray(function(err, docs) {
        res.json(docs);
    });   
});


app.post('/sms', function(req, res) {
    var phone_num = req.body.From;
    var text = req.body.Body;

    var orders = db.collection('messages');
    orders.update(
        {"from": phone_num},
        {$push: {"messages": text}}, 
        {upsert:true}
    );

    var resp = new twilio.TwimlResponse();
    resp.message("Got it! We'll process your order ASAP :)");
    res.writeHead(200, {'Content-Type':'text/xml'});
    res.end(resp.toString());
});