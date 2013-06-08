
var nock = require('nock'),
    fs = require('fs');

var http_mocks = nock('https://news.ycombinator.com/').persist(),
    feed = fs.readFileSync(__dirname + '/news.html');

http_mocks
   .get('/news')
   .reply(200, feed)

   .get('/newest')
   .reply(200, feed)
   
   .get('/ask')
   .reply(200, feed)

   .get('/x?fnid=YhmqhxKOmmHmfoXpJcaNsd')
   .reply(200, feed); 

