
var cheerio = require('cheerio');

module.exports.parseFeed = function(html) {
   var $ = cheerio.load(html),
       $noMore = function() { return $(this).text() != 'More'; };

   return {
      entries: $("td.title a").filter($noMore).map(function() {
        var $threadLink = $(this).parents('tr').next('tr').find('td.subtext a[href^=item]');

        if ($threadLink.length > 0) {
           return {
              url: $(this).attr('href'),
              title: $(this).text(),
              owner: $threadLink.siblings('a[href^=user]').text(),
              hnThreadId: $threadLink.attr('href').split('=')[1],
              score: $threadLink.siblings('span[id^=score]').text().split(' ')[0],
              commentScore: +$threadLink.text().split(' ')[0] || 0
           };
        }
      }).toArray(),

      moreUri: $("td.title a").last().attr('href')
   };
};
