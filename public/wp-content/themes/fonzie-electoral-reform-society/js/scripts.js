/* Application environment
   ========================================================================== */

/* eslint-disable no-unused-vars */
/* eslint-disable no-native-reassign */
'use strict';

/* eslint-disable no-undef */

template.desktop_more_menu = function () {};
/* eslint-enable no-undef */

/**
 * Set up environment globals.
 */
var ers_template = {};

/**
 * Define jQuery in noConflict mode.
 */
/* eslint-disable no-global-assign */
$ = jQuery.noConflict();
/* eslint-enable no-global-assign */
/* Template: Branding Menu
   ========================================================================== */

'use strict';

ers_template.brandingMenu = function () {
	$('.ers-branding__menu').click(function (e) {
		e.stopPropagation();
		e.preventDefault();

		$('.menu-toggle').trigger('click');

		if ($('#site-navigation').hasClass('open')) {
			$(this).addClass('ers-branding__menu--active');
		} else {
			$(this).removeClass('ers-branding__menu--active');
		}
	});

	$(document).on('click touchend', function (e) {
		if (!$(e.target).closest('#navbar').length) {
			$('.ers-branding__menu').removeClass('ers-branding__menu--active');
		}

		if (!$(e.target).closest('.ers-toolbar').length) {
			$('.ers-toolbar').removeClass('ers-toolbar--active');
			$('#toolbar-search').attr('aria-hidden', 'true');
		}
	});
};
/* Template: Element Link
   ========================================================================== */

'use strict';

ers_template.elementLink = function () {

	$('.element-link').click(function () {

		if ($(this).find('a').attr('target') === '_blank') {
			window.open($(this).find('a').attr('href'), '_blank');
		} else {
			window.location = $(this).find('a').attr('href');
		}

		return false;
	});
};
/* Template: Toolbar
   ========================================================================== */

'use strict';

ers_template.toolbar = function () {
	$('.ers-toolbar__search').click(function (e) {
		e.preventDefault();
		e.stopPropagation();

		$('.ers-toolbar').toggleClass('ers-toolbar--active');

		if ($('.ers-toolbar').hasClass('ers-toolbar--active')) {
			$('#ers-toolbar__search-form-input').focus();
			$('#toolbar-search').attr('aria-hidden', 'false');
		} else {
			$('#toolbar-search').attr('aria-hidden', 'true');
		}
	});
};
/* Template: Voting filter
   ========================================================================== */

'use strict';

ers_template.votingFilter = function () {

	var $form = $('#voting-filter-form'),

	//$select = $('#voting-filter-select'),
	$button = $form.find('button');

	$button.hide();

	$('.voting-leader__item').css('height', 'auto');

	// $select.change(function() {
	// 	this.form.submit();
	// });

	if ($(window).width() > 767) {
		var elementHeights = $('.voting-leader__item').map(function () {
			return $(this).height();
		}).get();

		// Math.max takes a variable number of arguments
		// `apply` is equivalent to passing each height as an argument
		var maxHeight = Math.max.apply(null, elementHeights);

		// Set each height to the max height
		$('.voting-leader__item').css('height', maxHeight + 10);
	} else {
		$('.voting-leader__item').css('height', 'auto');
	}

	var $grid = $('.voting-leader').isotope({
		itemSelector: '.voting-leader__item',
		resizable: false,
		layoutMode: 'fitRows',
		getSortData: {
			title: '.voting-leader-child__heading',
			proportionality: '.proportionality parseInt',
			voter_choice: '.voter-choice parseInt',
			local_representation: '.local-representation parseInt'
		},
		//sortBy : 'proportionality',
		sortAscending: false
	});

	// sort items on button click
	$('.voting-filter').on('click', '.voting-filter__btn', function (e) {
		e.preventDefault();

		$('.voting-filter__btn').removeClass('voting-filter__btn--active');
		$(this).addClass('voting-filter__btn--active');

		var sortByValue = $(this).attr('data-sort-by');
		$grid.isotope({ sortBy: [sortByValue, 'title'] });

		$('#voting-filter-select').val(sortByValue + '_rating');
	});

	$('.voting-filter').on('change', '#voting-filter-select', function (e) {
		e.preventDefault();
		var sortByValue = $(this).find(':selected').attr('data-sort-by');
		$grid.isotope({ sortBy: sortByValue });

		$('.voting-filter__btn').removeClass('voting-filter__btn--active');
		$('.voting-filter__btn.' + sortByValue).addClass('voting-filter__btn--active');
	});
};
/* Electoral Reform Society Application
   ========================================================================== */

'use strict';

$(function () {
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

(function ($, sr) {

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function debounce(func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this,
			    args = arguments;
			function delayed() {
				if (!execAsap) func.apply(obj, args);
				timeout = null;
			}

			if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	};

	// smartresize
	jQuery.fn[sr] = function (fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};
})(jQuery, 'smartresize');

var windowWidthResize = $(window).width();

// Smart resize
$(window).smartresize(function () {

	if ($(window).width() !== windowWidthResize) {

		windowWidthResize = $(window).width();

		ers_template.votingFilter();
	}
});