
var cheerio = require('cheerio');

module.exports.parseFeed = function(html) {
   var $ = cheerio.load(html);

   return {
      entries: $("td.title a").map(function() {
         if ($(this).text() !== "More") {
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
         }
      }).filter(function(e) { return typeof e !== "undefined"; }),

      moreUri: $("td.title a").last().attr('href')
   };
};
