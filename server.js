"use strict";
require('./public/models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const featureController = require('./public/controllers/featureController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/public/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/public/views/layouts/' }));
app.set('view engine', 'hbs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Express server started at port : ${ PORT }');
});

app.use('/features', featureController);
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

