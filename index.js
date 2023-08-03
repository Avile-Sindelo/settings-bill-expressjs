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
  
  res.render('index', {updateSettings: settingsBill.getSettings(), totals: settingsBill.totals(), totalClass: settingsBill.getTotalClass()});
});

app.post('/settings', function(req, res){
    settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });
  
 console.log(settingsBill.getTotalClass());
  res.redirect('/');
});

app.post('/action', function(req, res){
  settingsBill.recordAction(req.body.actionType);

  res.redirect('/'); 
});

app.get('/actions', function(req, res){
  res.render('actions', {actions: settingsBill.actions()});
});

app.get('/actions/:actionType', function(req, res){
  const actionType = req.params.actionType;
  res.render('actions', {actions: settingsBill.actionsFor(actionType)});
});


let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('Server started on port :', PORT);
});