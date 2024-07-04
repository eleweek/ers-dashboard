/* Electoral Reform Society Application
   ========================================================================== */

'use strict';

$(function() {
	/* Template */
	ers_template.toolbar();
	ers_template.brandingMenu();
	//ers_template.votingCalcHeights();
	ers_template.votingFilter();
	ers_template.elementLink();

	/* jshint ignore:start */
	// eslint-disable-next-line no-undef
	objectFitImages();
	/* jshint ignore:end */
});

(function($,sr) {

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function(func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this, args = arguments;
			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			}

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	};

	// smartresize
	jQuery.fn[sr] = function(fn) {  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

var windowWidthResize = $(window).width();

// Smart resize
$(window).smartresize(function() {

	if ($(window).width() !== windowWidthResize) {

		windowWidthResize = $(window).width();

		ers_template.votingFilter();

	}
});
