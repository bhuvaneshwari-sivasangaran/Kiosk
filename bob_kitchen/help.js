"use strict";
// coded by Deeya Sunilkumar Doshi

// ready function
$(function () {

  // binding methods
  $("#accordion").accordion({
    collapsible: true,
    heightStyle: "content",
  });

  // image slider
  $('.bxSlider').bxSlider({
    mode: 'fade',
    captions: true,
    slideWidth: 400,
    auto: true,
    pause: 1000
  });

});
