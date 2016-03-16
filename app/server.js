var express = require('express');
var path = require('path');
var Twitter = require('twitter');

var app = express();
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});
var router = express.Router();


router.get('/', function (req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, './views') });
});

router.get('/api', function (req, res, next) {
  // Make q dynamic
  client.get('search/tweets', {q: 'javascript'}, function (err, data, response) {
    if (err) return console.error(err);
    console.log('TWITTER API RESPONSE:', response);
    res.status(200).send(data);
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', router);
app.use(express.static('app'));


module.exports = app;
