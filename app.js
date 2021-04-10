var express = require('express');
var app = express();
var port = 3000;
var path = require('path');


// archivos estaticos img/css/js
app.use(express.static('public'));

// routes
app.get('/lobby', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/lobby.html'));
});
app.get('/expositores', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/expositores.html'));
});
app.get('/stand-br', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/stand-br.html'));
});
app.get('/stand-ar', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/stand-ar.html'));
});
app.get('/stand-mx', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/stand-mx.html'));
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});
app.get('/auditorio', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/auditorio.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})