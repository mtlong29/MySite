$(document).ready(function () {

	// toggle overlay navigation
	$('.overlayMenuTrigger').on('click', function () {
		// in Firefox transitions break when parent overflow is changed, so we need to wait for the end of the transition to give the body an overflow hidden
		if ($('.overlayMenu').hasClass('is--visible')) {
			$('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			$('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		} else {
			$('.overlayMenu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			$('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		}
	});

	// close overlay navigation on button click
	$('.overlayMenuClose, #screen').on('click', function () {
		$('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		$('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	});

	// open/close overlay navigation on focus
	$('.overlayMenuItem a').on('focus', function () {
		$('.overlayMenu').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		$('#screen').addClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	});
	$('.overlayMenuClose').on('focus', function () {
		$('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		$('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
	});

	// close menu on [esc]
	$(document).on('keydown', function (e) {
		if (e.keyCode === 27) { // ESC key
			$('.overlayMenu').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			$('#screen').removeClass('is--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
		}
	});


	// move table of contents from post body to sidebar
	$(".post__body .js-toc").appendTo($(".toc--sidebar")).hide().fadeIn(400);


	// sticky sidebar
	$(".sticky").Stickyfill();


	// FitVids init
	$("#main").fitVids();


	// smooth scroll init
	$("a").smoothScroll({
		offset: -20
	});

	// add lightbox class to all image links
	$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");


	// Magnific-Popup options
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
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
		},
		removalDelay: 500, // Delay in milliseconds before popup is removed
		// Class that is added to body when popup is open.
		// make it unique to apply your CSS animations just to this exact popup
		mainClass: 'mfp-zoom-in',
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
			}
		},
		closeOnContentClick: true,
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});


	// lazy load settings
	$("img.load").show().lazyload({
		effect: "fadeIn",
		skip_invisible: false
	});


});

<!-- Google Universal Analytics -->
(function (i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', '{{ site.owner.google.analytics }}');
ga('send', 'pageview');
