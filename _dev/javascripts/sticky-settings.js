/****************************************************
stickyfill.js settings
****************************************************/

$(document).ready(() => {
  // sticky settings
  const $headerHeight = $('.masthead').height();
  const $contentsOffset = $('header').height() - $('.post__title').height();

  $('.sticky').sticky({
    topSpacing: $headerHeight + $contentsOffset,
    widthFromWrapper: false
  }); // end sticky settings

  // callback functions for events created by stickyfill.js
  $('.sticky').on('sticky-start', () => {
    $('.toc').css('border-top', '0');
    $('.toc__title').css({
      'border-left': '8px solid #5C88C4',
      'padding': '0 0 0 .75rem'
    });
  });
  $('.sticky').on('sticky-end', () => {
    $('.toc').css('border-top', '8px solid #5C88C4');
    $('.toc__title').css({
      'border-left': '0',
      'padding': '0'
    });
  }); // end sticky callback functions
});