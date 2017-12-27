$(document).ready(() => {

  /****************************************************
  add target equals blank to out of site links
  ****************************************************/

  $('a[href^="http://"], a[href^="https://"]').attr('target','_blank');

  /****************************************************
  move table of contents from post body to sidebar
  ****************************************************/

  $('.page-body .js-toc').appendTo($('.toc--sidebar')).hide().fadeIn(600);

  /****************************************************
  smooth scroll settings
  ****************************************************/

  $('a').smoothScroll({
    offset: 5
  });

  /****************************************************
  lazy load settings
  ****************************************************/
  
  $('img.load').show().lazyload({
    effect: 'fadeIn',
    skip_invisible: false
  });

});
