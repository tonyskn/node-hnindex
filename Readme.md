# HNIndex

[![Build Status][travis-image]][travis] [![Coverage Status][coveralls-image]][coveralls]

Very simple HackerNews scraper for Node.js

## Installation

```
npm install hnindex
```

## Usage

```javascript
var HN = require('hnindex');

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
```

### API

```javascript
// Parses links from /news
HN.popular(function(err, result) { 
    // do something with result.entries
    
    result.more( function(err, moreResult) { ... } );
});

// Parses links from /newest
HN.newest( function(err, results) { ... } );

// Parses links from /ask
HN.ask( function(err, results) { ... } );
```


[travis]: http://travis-ci.org/tonyskn/node-hnindex
[travis-image]: https://secure.travis-ci.org/tonyskn/node-hnindex.png?branch=master
[coveralls]: https://coveralls.io/r/tonyskn/node-hnindex
[coveralls-image]: https://coveralls.io/repos/tonyskn/node-hnindex/badge.png?branch=master

