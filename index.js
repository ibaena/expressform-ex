var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var PORT = 8080;

function myLoggingMiddleware(req, res, next){
  var url = req.url;
  var method = req.method;

  console.log('%s request at %s', method, url);
  next();
}

// This is the bodyParser middleware
 app.use(bodyParser.urlencoded({ extended: false }));

 app.use(myLoggingMiddleware);

 app.use(
   session(
     {
   secret: 'my super secret',
   cookie: {maxAge: 60000},
   saveUninitialized: true,
   resave: false
 })
);

app.get('/', function(req, res) {
  var sess = req.session
  res.sendFile(process.cwd() + '/home.html');

  if (sess.views){
    sess.views++;
    res.end("you viewed this page "+ sess.views + " times");
  }else{
    sess.views = 1;
  }
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
