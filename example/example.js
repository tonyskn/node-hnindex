var HN = require('../index');

var entriesView = function(i, entries) {
   return entries.map(function(entry) {
      return i++ + "> " + entry.title +
               " [" + entry.url + "] " +
               " by (" + entry.owner + ") " +
               entry.hnThreadId + " | " + entry.score + "/" + entry.commentScore;
   });
};


HN.newest(function(err, results) {
   console.log(entriesView(1, results.entries));

   results.more(function(err, moreResults) {
      console.log(entriesView(31, results.entries));
   });
});
