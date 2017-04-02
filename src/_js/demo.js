var $ = require('jquery');
var tocjs = require('./tocjs');

$(function() {
  $('.toc-src').tocjs({
    min: 2
  });
});
