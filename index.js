import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import SettingsBill from './settings-bill-factory.js';
// var exphbs = require('express-handlebars')
//let express = require('express');
let app = express();
let settingsBill = SettingsBill();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
  
  res.render('index', function(err){
    const options = {
      settings: settingsBill.getSettings(),
      totals: settingsBill.totals()
    }
    if (err) {
      console.error('Error rendering view:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.send(options)
  });
});

app.post('/settings', function(req, res){
    settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });

  console.log(settingsBill.getSettings()); 
  res.redirect('/');
});

app.post('/action', function(req, res){
  //capture the data
  settingsBill.recordAction(req.body.actionType);

  res.redirect('/');
});

app.get('/actions', function(req, res){

});

app.get('/actions/:type', function(req, res){

});



let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App started on port :', PORT);
});