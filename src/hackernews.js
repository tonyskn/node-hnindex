
var request = require('request'),
    parser = require('./parser');


function HN() {
   this.options = {
      base_url: "https://news.ycombinator.com",
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
   var self = this;

   request.get({
      url: this.options.base_url + uri,
      headers: this.options.headers
   }, function(err, resp, htmlResult) {
      if (err) {
         callback(err);
      } else {
         var results = parser.parseFeed(htmlResult);
         callback(null, {
            entries: results.entries,
            more: self.scrap.bind(self, results.moreUri)
         });
      }
   });

};

module.exports = new HN();
