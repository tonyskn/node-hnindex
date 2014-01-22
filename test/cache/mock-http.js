
var nock = require('nock');

nock('https://news.ycombinator.com/')
  .persist()

  .get('/news')
  .replyWithFile(200, __dirname + '/news.html')

  .get('/newest')
  .replyWithFile(200, __dirname + '/news.html')

  .get('/ask')
  .replyWithFile(200, __dirname + '/news.html')

  .get('/x?fnid=YhmqhxKOmmHmfoXpJcaNsd')
  .replyWithFile(200, __dirname + '/news.html'); 
