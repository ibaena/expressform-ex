var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 8080;

function myLoggingMiddleware(req, res, next){
  var url = req.url;
  var method = req.method;

  console.log('%s request at %s', url, method);
}

// This is the bodyParser middleware
 app.use(bodyParser.urlencoded({ extended: false }));

 app.use(myLoggingMiddleware)

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/home.html');
});

app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + '/views/login.html');
});

app.get('/account', function(req, res) {
  res.sendFile(process.cwd() + '/views/account.html');
});

app.get('/help', function(req, res) {
    res.sendFile(process.cwd() + '/views/help.html');
});

app.post('/login', function(req, res) {
    var username = req.body.user;
    var password = req.body.password;
    if(req.body.password === 'Ivan'){
      res.redirect('/account');
    }else{
        res.redirect('/');
    }
    console.log("post received: %s", username);
    console.log("post received: %s ",password);
});

app.listen(PORT, function() {
  console.log('App listening on port %s', PORT);
});
