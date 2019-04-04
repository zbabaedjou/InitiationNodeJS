// On charge le framework Express...
var express = require('express');
// On crée l'application web
var app = express();
// On configure Express pour servir les fichiers contenus dans public/
// à l'url /s
app.use('/s', express.static('public'));
app.use(require('body-parser').urlencoded({ extended: false }));
const cookieP = require('cookie-parser');
app.use(cookieP());

let jours = { 'mon' : 'Lundi',
              'tue' : 'Mardi',
              'wed' : 'Mercredi',
              'thu' : 'Jeudi',
              'fri' : 'Vendredi',
              'sat' : 'Samedi',
              'sun' : 'Dimanche' };

let value='';

for (let e in jours) {
    value=value + '<br>' + e+': '+jours[e];
}

/****** Routes *******/

// On définit une route pour l'url /

app.all('/', function(req, res) {
   let quer='QUERIES';
  let body='BODY';
  let hed=' HEADERS';
  let cook=' COOKIES';
  
  if (req.query!=null)    
    for (let e in req.query) {
      quer=quer + '<br>' + e+': '+req.query[e]+' '+req._parsedUrl.query;
    }
  if (req.body!=null)
    for (let e in req.body) {
      body=body + '<br>' + e+': '+req.body[e]+' '+req._parsedUrl.body;
    }
  
  if (req.headers!=null)
    for (let e in req.headers) {
      hed=hed + '<br>' + e+': '+req.headers[e];
    }
  
  if (req.cookies!=null)
  for (let e in req.cookies) {
      cook=cook + '<br>' + e+': '+req.cookies[e];
    }
  
      let total=quer+ '<br>'+body+ '<br>'+hed+ '<br>'+cook;

  res.send(total);
});

app.use('/s/static/form.html', express.static('static/form.html'));

app.get('/query_string', function(req, res) {
   let val='';
    for (let e in req.query) {
      val=val + '<br>' + e+': '+req.query[e]+' '+req._parsedUrl.query;
    }
  res.send(val);
});
app.post('/form_data', function(req, res) {
   let val='';
    for (let e in req.body) {
      val=val + '<br>' + e+': '+req.body[e]+' '+req._parsedUrl.body;
    }
  res.send(val);
});

app.all('/headers', function(req, res) {
   let val=' HEADERS';
  let vale=' COOKIES';
    for (let e in req.headers) {
      val=val + '<br>' + e+': '+req.headers[e];
    }
  
  for (let e in req.cookies) {
      vale='cookies'+vale + '<br>' + e+': '+req.cookies[e];
    }
  let total=val+ '<br>'+vale;
  res.send(total);
});



app.listen(process.env.PORT);

