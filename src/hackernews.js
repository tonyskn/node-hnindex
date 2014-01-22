
var request = require('request'),
    parser = require('./parser');


function HN() {
  this.request = {
    base_url: "https://news.ycombinator.com",
    method: "GET",
    headers: {
      'Accept': '*/*',
      'Connection': 'close',
      'User-Agent': 'node-hnindex'
    },
  };
}

HN.prototype.popular = function(callback) {
  return this.scrap("/news", callback);
};

HN.prototype.newest = function(callback) {
  return this.scrap("/newest", callback);
};

HN.prototype.ask = function(callback) {
  return this.scrap("/ask", callback);
};


HN.prototype.scrap = function(uri, callback) {
  uri = uri || "/";

  var self = this;

  this.request.url = this.request.base_url + (uri[0] !== '/' ? "/" : "") +  uri;

  request(this.request, function(err, resp, htmlResult) {
    if (err) {
      return callback(err);
    }

    var results = parser.parseFeed(htmlResult);
    callback(null, {
      entries: results.entries,
      more: self.scrap.bind(self, results.moreUri)
    });
  });
};

module.exports = new HN();
