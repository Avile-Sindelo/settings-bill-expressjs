import express from 'express';
import { engine } from 'express-handlebars';
// var exphbs = require('express-handlebars')
//let express = require('express');
let app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.get("/", function(req, res){
  res.render('index');
});

app.post('/settings', function(req, res){

});

app.post('/action', function(req, res){

});

app.get('/actions', function(req, res){

});

app.get('/actions/:type', function(req, res){

});



let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App started on port :', PORT);
});