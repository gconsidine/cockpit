var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var PlzConfig = require('./plz-config');
var plz = require('plz-cms')(PlzConfig);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../')));

require('./app.routes')(app, express, plz);
require('./admin.routes')(app, express, plz);
require('./error.routes')(app, express, plz);

var server = app.listen(8080);

module.exports = app;
