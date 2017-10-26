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
  $('a[href^="http://"], a[href^="https://"]').attr('target','_blank');
  // $('a:not([href*="http://localhost:4000"],[href*="http://www.mtlong.me/"])').attr("target", "_blank");

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

  // Button Sorting For Courses On Notes Page
  // Array of All Courses
  const courses = [
    'Treehouse - Front End Web Development',
    'Treehouse - Beginner JavaScript',
    'Treehouse - Full Stack JavaScript',
    'Treehouse - Learn React'
  ];
  // Sort courses Array By Name
  courses.sort()
  // Select courseTags ID
  const $courseTags = $('#courseTags');
  // Get The Number of Courses
  const numberOfCourses = courses.length;
  // Initialize HTML Button String Including The All Button
  let html = '<button>All</button>';
  // Iterate Over Courses
  for (let i = 0; i < numberOfCourses; i++) {
    // Generate Course Tag Buttons
    html += '<button>' + courses[i] + '</button>';
  }
  // Append Course Tag Buttons To DOM
  $courseTags.append(html);
  // Select Now Generated Course Tag Buttons
  const $courseTagButton = $('#courseTags button');
  // Iterate Over Courses
  for (let i = 0; i < numberOfCourses; i++) {
    // Add Click Event for Buttons
    $courseTagButton.on('click', (e) => {
      if (e.target.innerHTML === 'All') {
        $('.course h3').parentsUntil('.individualTile').show();
      } else if (e.target.innerHTML === courses[i]) {
        $('.course h3:contains(' + e.target.innerHTML + ')').parentsUntil('.individualTile').show();
      } else {
        $('.course h3:not(:contains(' + e.target.innerHTML + '))').parentsUntil('.individualTile').hide();
      }
    });
  }

});

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(a){var b="1.7.2",c={},d={exclude:[],excludeWithin:[],offset:0,direction:"top",delegateSelector:null,scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficient:2,preventDefault:!0},e=function(b){var c=[],d=!1,e=b.dir&&"left"===b.dir?"scrollLeft":"scrollTop";return this.each(function(){var b=a(this);if(this!==document&&this!==window)return!document.scrollingElement||this!==document.documentElement&&this!==document.body?void(b[e]()>0?c.push(this):(b[e](1),d=b[e]()>0,d&&c.push(this),b[e](0))):(c.push(document.scrollingElement),!1)}),c.length||this.each(function(){this===document.documentElement&&"smooth"===a(this).css("scrollBehavior")&&(c=[this]),c.length||"BODY"!==this.nodeName||(c=[this])}),"first"===b.el&&c.length>1&&(c=[c[0]]),c};a.fn.extend({scrollable:function(a){var b=e.call(this,{dir:a});return this.pushStack(b)},firstScrollable:function(a){var b=e.call(this,{el:"first",dir:a});return this.pushStack(b)},smoothScroll:function(b,c){if(b=b||{},"options"===b)return c?this.each(function(){var b=a(this),d=a.extend(b.data("ssOpts")||{},c);a(this).data("ssOpts",d)}):this.first().data("ssOpts");var d=a.extend({},a.fn.smoothScroll.defaults,b),e=function(b){var c=function(a){return a.replace(/(:|\.|\/)/g,"\\$1")},e=this,f=a(this),g=a.extend({},d,f.data("ssOpts")||{}),h=d.exclude,i=g.excludeWithin,j=0,k=0,l=!0,m={},n=a.smoothScroll.filterPath(location.pathname),o=a.smoothScroll.filterPath(e.pathname),p=location.hostname===e.hostname||!e.hostname,q=g.scrollTarget||o===n,r=c(e.hash);if(r&&!a(r).length&&(l=!1),g.scrollTarget||p&&q&&r){for(;l&&j<h.length;)f.is(c(h[j++]))&&(l=!1);for(;l&&k<i.length;)f.closest(i[k++]).length&&(l=!1)}else l=!1;l&&(g.preventDefault&&b.preventDefault(),a.extend(m,g,{scrollTarget:g.scrollTarget||r,link:e}),a.smoothScroll(m))};return null!==b.delegateSelector?this.undelegate(b.delegateSelector,"click.smoothscroll").delegate(b.delegateSelector,"click.smoothscroll",e):this.unbind("click.smoothscroll").bind("click.smoothscroll",e),this}}),a.smoothScroll=function(b,d){if("options"===b&&"object"==typeof d)return a.extend(c,d);var e,f,g,h,i,j=0,k="offset",l="scrollTop",m={},n={};"number"==typeof b?(e=a.extend({link:null},a.fn.smoothScroll.defaults,c),g=b):(e=a.extend({link:null},a.fn.smoothScroll.defaults,b||{},c),e.scrollElement&&(k="position","static"===e.scrollElement.css("position")&&e.scrollElement.css("position","relative"))),l="left"===e.direction?"scrollLeft":l,e.scrollElement?(f=e.scrollElement,/^(?:HTML|BODY)$/.test(f[0].nodeName)||(j=f[l]())):f=a("html, body").firstScrollable(e.direction),e.beforeScroll.call(f,e),g="number"==typeof b?b:d||a(e.scrollTarget)[k]()&&a(e.scrollTarget)[k]()[e.direction]||0,m[l]=g+j+e.offset,h=e.speed,"auto"===h&&(i=Math.abs(m[l]-f[l]()),h=i/e.autoCoefficient),n={duration:h,easing:e.easing,complete:function(){e.afterScroll.call(e.link,e)}},e.step&&(n.step=e.step),f.length?f.stop().animate(m,n):e.afterScroll.call(e.link,e)},a.smoothScroll.version=b,a.smoothScroll.filterPath=function(a){return a=a||"",a.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},a.fn.smoothScroll.defaults=d});