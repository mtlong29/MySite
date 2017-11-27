$(document).ready(() => {

  // add target equals blank to out of site links
  $('a[href^="http://"], a[href^="https://"]').attr('target','_blank');

  // move table of contents from post body to sidebar
  $('.post__body .js-toc').appendTo($('.toc--sidebar')).hide().fadeIn(600);

  // smoothScroll settings
  $('a').smoothScroll({
    offset: 5
  }); // end smoothScroll settings

  // add lightbox class to all image links
  $('a[href$=".jpg"],a[href$=".png"],a[href$=".gif"]').addClass('image-popup');

  // lazy load settings
  $('img.load').show().lazyload({
    effect: 'fadeIn',
    skip_invisible: false
  }); // end lazy load settings

});
