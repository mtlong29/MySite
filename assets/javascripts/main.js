$(document).ready(() => {

  // Toggle Overlay Navigation
  $('.overlayMenuTrigger').on('click', () => {
    if ($('.overlayMenu').hasClass('is--visible')) {
      $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    } else {
      $('.overlayMenu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  });
  // Close Overlay Navigation On Button Click
  $('.overlayMenuClose, #screen').on('click', () => {
    $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  // Toggle Menu Overlay Navigation On Focus
  $('.overlayMenuItem a').on('focus', () => {
    $('.overlayMenu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  $('.overlayMenuClose').on('focus', () => {
    $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  // Close Menu On [esc]
  $(document).on('keydown', e => {
    if (e.keyCode === 27) { // ESC key
      $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  }); // End Toggle Overlay Navigation

  // Add Target Equals Blank to Out of Site Links
  $('a:not([href*="http://localhost:4000"],[href*="http://www.mtlong.me/"])').attr("target", "_blank");

  // Move Table of Contents From Post Body to Sidebar
  $('.post__body .js-toc').appendTo($('.toc--sidebar')).hide().fadeIn(600);

  // Sticky Settings
  const $headerHeight = $('.masthead').height();
  const $contentsOffset = $('header').height() - $('.post__title').height();

  $('.sticky').sticky({
    topSpacing: $headerHeight + $contentsOffset,
    widthFromWrapper: false
  }); // End Sticky Settings

  // Callback Functions for Events Created by Sticky.js
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
  }); // End Sticky Callback Functions

  // Smooth Scroll Settings
  $('a').smoothScroll({
    offset: 5
  }); // End smoothScroll Settings

  // Add Lightbox Class to All Image Links
  $('a[href$=".jpg"],a[href$=".png"],a[href$=".gif"]').addClass('image-popup');


  // Magnific-Popup Settings
  $('.image-popup').magnificPopup({
    disableOn: () => {
      if ($(window).width() < 500) {
        return false;
      }
      return true;
    },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500,
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function () {
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true
  }); // End Magnific-Popup Settings

  // Lazy Load Settings
  $('img.load').show().lazyload({
    effect: 'fadeIn',
    skip_invisible: false
  }); // End Lazy Load Settings

});
