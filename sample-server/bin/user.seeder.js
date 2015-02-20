var config = require('../plz-config');
var plz = require('plz-cms')(config);

process.stdin.resume();
process.stdin.setEncoding('utf8');

var util = require('util');
var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;

var input = [];

console.log();
console.log('================================================================================');
console.log('COCKPIT / PLZ-CMS SAMPLE-SERVER SEEDER');
console.log('================================================================================');
console.log('\nConfiguration note:\n');
console.log([
  'Set the following environment variables to be picked up by the bundled', 
  'plz-config file, or aternatively, edit the config file directly.\n',
  '* PLZ_MAIL_SERVICE',
  '* PLZ_MAIL_ADDRESS',
  '* PLZ_MAIL_PASSWORD',
  '* PLZ_DB_URI\n',
  'The email address you enter below will be the only user without a',
  'phoney address for testing account reset/activation.  The rest of',
  'the users will only exist as dummy data.\n'
].join('\n'));

console.log();
console.log('================================================================================\n');

console.log('1. Enter a valid email address for activation/reset testing:\n');

process.stdin.on('data', prompt);

function prompt(text) {
  input.push(text.split('\n')[0]);

  if(text === 'bye' || text === 'exit' || text === 'end') {
    process.exit();
  }

  if(input.length === 1) {
    console.log('\n2. Enter dummy user count:\n');
  }

  if(input.length >= 2) {
    init();
  }

}

function init() {
  if(!plz.validate.email(input[0]) || !plz.validate.number(parseInt(input[1]))) {
    console.log('\nBad input.\n');
    process.exit();
  }

  console.log('\nSeeding database: ' + process.env.PLZ_DB_URI + '\n');

  MongoClient.connect(process.env.PLZ_DB_URI, function(err, db) {
    var collection = db.collection(config.admin.collection);

    collection.drop(function (error) {
      if(error) { 
        logError(); 
      }

      createPrimaryUser();
      createDummyUsers();
    });
  });
}

function createPrimaryUser() {
  var options = {
    name: 'Real User',
    email: input[0],
    role: 'user',
    password: crypto.createHash('sha256').update('Whatever*').digest('hex'),
    status: 'active',
    modifiedAt: Date.now()
  };

  plz.create.user(options, function (error, result) {
    if(error) {
      logError();
      process.exit();
    }
  });
}

function createDummyUsers() {
  var count = 0;

  for(var i = 0; i < input[1]; i++) {
    var options = {
      name: 'Dummy User' + i,
      email: 'test' + i + '@exmaple.com',
      role: 'user'
    };

    plz.create.user(options, function (error, result) {
      if(error) {
        logError(result);
        process.exit();
      }

      count++;
      if(count >= input[1]) {
        wrapUp();
      }
    });
  }
}

function wrapUp() {
  console.log('DB successfully seeded.\n');
  process.exit();
}

function logError(result) {
  console.log('Error seeding DB.  Check your config file and/or env variables\n');
  console.log(result);
}
