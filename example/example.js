var HN = require('../index');

var entries = function(i, entries) {
   return entries.map(function(entry) {
      return i++ + "> " + entry.title +
               " [" + entry.url + "] " +
               " by (" + entry.owner + ") " +
               entry.hnThreadId + " | " + entry.score + "/" + entry.commentScore;
   });
};


HN.popular(function(err, results) {
   console.log(entries(1, results.entries));

   results.more(function(err, moreResults) {
      console.log(entries(31, results.entries));
   });
});
