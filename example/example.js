var HN = require('../');

var template = (function(i) {
    return function(entries) {
       return entries.map(function(entry) {
          return i++ + "> " + entry.title +
                   " [" + entry.url + "] " +
                   " by (" + entry.owner + ") " +
                   entry.hnThreadId + " | " + entry.score + "/" + entry.commentScore;
       });
    };
})(1);


HN.popular( function(err, results) {
   console.log( template(results.entries) );

   results.more( function(err, moreResults) {
      console.log( template(moreResults.entries) );
   } );
} );

