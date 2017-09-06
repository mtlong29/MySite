$(document).ready(function () {

  // Toggle Overlay Navigation
  $('.overlayMenuTrigger').on('click', function () {
    if ($('.overlayMenu').hasClass('is--visible')) {
      $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    } else {
      $('.overlayMenu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  });
  // Close Overlay Navigation On Button Click
  $('.overlayMenuClose, #screen').on('click', function () {
    $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  // Toggle Menu Overlay Navigation On Focus
  $('.overlayMenuItem a').on('focus', function () {
    $('.overlayMenu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  $('.overlayMenuClose').on('focus', function () {
    $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
  });
  // Close Menu On [esc]
  $(document).on('keydown', function (e) {
    if (e.keyCode === 27) { // ESC key
      $('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    }
  }); // End Toggle Overlay Navigation

  // Move Table of Contents From Post Body to Sidebar
  $(".post__body .js-toc").appendTo($(".toc--sidebar")).hide().fadeIn(400);

  // Sticky Sidebar Initalize
  $(".sticky").Stickyfill();

  // FitVids Initialize
  $("#main").fitVids();

  // Smooth Scroll Initialize
  $("a").smoothScroll({
    offset: -20
  });

  // Add Lightbox Class to All Image Links
  $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");


  // Magnific-Popup Settings
  $('.image-popup').magnificPopup({
    disableOn: function () {
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
  $("img.load").show().lazyload({
    effect: "fadeIn",
    skip_invisible: false
  }); // End Lazy Load Settings

});
