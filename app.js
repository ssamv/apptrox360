const express = require('express'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection'),
      ejs = require('ejs'),
      session = require('express-session');

const app = express();
const port = 3005;
const path = require('path');

app.set('views', __dirname + '/views')
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

// importing routes
const mainRoutes = require('./routes/main');


// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'mysql-27691-0.cloudclusters.net',
  user: 'admin_trox',
  password: 'Trox$Swaper$2021',
  database: 'trox360_db',
  port: 27691
}, 'single'));
app.use(express.urlencoded({extended: true}));

//session
app.use(session({
  secret: 'Trox$Swaper$2021',
  resave: true,
  saveUninitialized: true
}));

// routes
app.use('/', mainRoutes);

// archivos estaticos img/css/js
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})