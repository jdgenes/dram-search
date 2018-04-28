var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var db = require('../models/db-connect.js');
var stringify = require('node-stringify');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), getSheetItems);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function getSheetItems(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1X1HTxkI6SqsdpNSkSSivMzpxNT-oeTbjFFDdEkXD30o',
    range: 'A1:H',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {

    //  db starts here
      db.query('DROP TABLE IF EXISTS Scotch;');
      db.query('CREATE TABLE IF NOT EXISTS Scotch(id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,timestamp varchar(255),scotch_name VARCHAR(255),user VARCHAR(255),review_url VARCHAR(255),score int,type VARCHAR(255),price int,review_date VARCHAR(255));', function(err, rows){
        if (err) throw err;
        if (db.connected === true) {
        console.dir("Connected to database");
        }
        console.dir(rows);
      });
    console.log('Grabbing table data...');
    for (var i = 1; i < rows.length; i++) {
      //add items to db
      db.query('INSERT INTO Scotch (timestamp, scotch_name, user, review_url, score, type, price, review_date) VALUES (' + stringify(rows[i][0]) + ', ' + stringify(rows[i][1]) + ', ' + stringify(rows[i][2]) + ', ' + stringify(rows[i][3]) + ', ' + stringify(rows[i][4]) + ', ' + stringify(rows[i][5]) + ', ' + stringify(rows[i][6]) + ', ' + stringify(rows[i][7]) + ');', function(err){
        if (err) throw err;
      });
      console.log('...added item...' + i);
    }
    db.end();
    //  end of loop
    }
  });
}

/*

0  'Timestamp', timestamp
1  'Whisky Name', scotch_name
2  'Reviewer\'s Reddit Username', user
3  'Link To Reddit Review', review_url
4  'Reviewer Rating', score
5  'Whisky Region or Style', type
6  'Full Bottle Price Paid', price
7  'Date of Review', review_date

*/
