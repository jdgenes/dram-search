var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var morgan = require('morgan');
var db = require('./models/db-connect.js');
// var connectSheets = require('./controllers/google-sheets-connect.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/client/dist'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(5000, function(err){
    if (err) throw err;
});

const getDramsByQuery = (req, res) => {
    const { column, whereThis, equalsThis, groupByThis } = req.params;
    db.query('select ' + column + ' from Scotch where ' + whereThis + ' = ' + '\'' + equalsThis + '\'' + ' group by ' + groupByThis, function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const getDrams = (req, res) => {
    db.query('select * from Scotch', function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const getDramNames = (req, res) => {
    db.query('select scotch_name from Scotch group by scotch_name', function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const getDramById = (req, res) => {
    const { id } = req.params;
    db.query('select * from Scotch where id = ' + id, function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const getDramsByName = (req, res) => {
    const { name } = req.params;
    db.query('select * from Scotch where scotch_name = ' + '\'' + name + '\'', function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const getDramsByScore = (req, res) => {
    const { min, max } = req.params;
    db.query('select * from Scotch where score >= ' + min + ' && score <= ' + max, function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const getDramsByType = (req, res) => {
    const { type } = req.params;
    db.query('select * from Scotch where type = ' + '\'' + type + '\'', function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const getDramsByPrice = (req, res) => {
    const { min, max } = req.params;
    db.query('select * from Scotch where price >= ' + min + ' && price <= ' + max, function(err, row) {
        if (err) throw err;
        res.json(row);
    });
}

const pingDB = (req, res) => {
    db.query('select * from Scotch where id = 1', function(err, row) {
        if (err) throw err;
        console.log('... ');
    });
}

var pingCount = 0;

setInterval( function () {
    pingDB();
    console.log(pingCount);
    pingCount++
}, 5000);

// API calls setup for extra data fetching reasons
app.route('/drams')
    .get(getDrams);
app.route('/dramnames')
    .get(getDramNames);
app.route('/drams/:id')
    .get(getDramById);
app.route('/drams/name/:name')
    .get(getDramsByName);
app.route('/drams/score/:min/:max')
    .get(getDramsByScore);
app.route('/drams/type/:type')
    .get(getDramsByType);
app.route('/drams/price/:min/:max')
    .get(getDramsByPrice);
app.route('/drams/query/:column/:whereThis/:equalsThis/:groupByThis')
    .get(getDramsByQuery);

/*

  'Timestamp', timestamp
  'Whisky Name', scotch_name
  'Reviewer\'s Reddit Username', user
  'Link To Reddit Review', review_url
  'Reviewer Rating', score
  'Whisky Region or Style', type
  'Full Bottle Price Paid', price
  'Date of Review', review_date

*/
