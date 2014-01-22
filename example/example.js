var HN = require('../');

var n = 1;

var printer = function(err, results) {
  if (err) {
    return console.log("ERROR!", err);
  }

  results.entries.forEach(function(entry) {
    console.log(n++ + "> " + entry.title +
                " [" + entry.url + "] " +
                " by (" + entry.owner + ") " +
                entry.hnThreadId + " | " + entry.score + "/" + entry.commentScore);
  });
};

HN.popular(function(err, results) {
  printer(err, results);

  results.more(printer);
});


