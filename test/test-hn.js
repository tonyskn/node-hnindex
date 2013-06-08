
var HN = require('../index.js'),
    should = require('should');

// Mock API calls
if (process.env.HTTP_MOCK) {
   require('./cache/mock-http');
}

module.exports = {
   "HN Scraper": {
      "Should scrap ~30 popular results": function(done) {
         HN.popular(function(err, results) {
            should.not.exist(err);

            results.entries.should.have.length(29);

            done();
         });
      },

      "Should yield results with url, threadId, and scores": function(done) {
         HN.newest( assertProperties.bind(this, done) );
      },

      "Should enable scraping next results page": function(done) {
         HN.ask( function(err, results) {
            results.more( assertProperties.bind(this, done) );
         });
      }
   }
};


var assertProperties = function(done, err, results) {
   should.not.exist(err);

   results.entries.forEach(function(entry) {
      entry.should.have.property("url");
      entry.should.have.property("title");
      entry.should.have.property("owner");
      entry.should.have.property("hnThreadId");
      entry.should.have.property("score");
      entry.should.have.property("commentScore");
   });

   done();
};

