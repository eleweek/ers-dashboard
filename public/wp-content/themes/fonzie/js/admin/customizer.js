/* Define jQuery in noConflict mode */
$ = jQuery.noConflict();

(function( $ ) {
    "use strict";

	/* 
		variables
	*/

		// selectors for the elements that we need to change 
		// live will be stored in elements
	    var elements = [];
	    	elements['primary'] = [],
	    	elements['secondary'] = [],
	    	elements['tertiary'] = [],
	    	elements['text'] = [];
	   	// css to be added to a style block in the head will
	   	// be kept here
	    var css = [];

	/* 
		primary color element selectors 
	*/

		// background
		elements['primary']['background'] = '.btn:not(.btn_outlined), .homepage-header, .newsletter-signup, .navbar ul.menu > .menu-item:hover, .navbar ul.menu > .menu-item-has-children .sub-menu, .cta__button, .cta:hover .cta__button, .panel-location .panel-heading';

		// color
	    elements['primary']['color'] = 'a, a:hover, a:focus, .btn_outlined, .block__item--generic .block__link, .block__content h2, table th, .sidebar .active > a';

	    // border
	    elements['primary']['border'] = '.btn_outlined';

	    // fill
	    elements['primary']['fill'] = '.btn_outlined i path, .block__item--generic .block__link .icon svg path, .breadcrumbs svg path, .panel-location .panel-heading .icon-minus svg path';

	/* 
		secondary color element selectors
	*/

		// background
		elements['secondary']['background'] = '.navbar, .site-footer__links, .btn:hover:not(.btn_outlined), .btn:focus:not(.btn_outlined), .cta__text, .cta:hover .cta__text';

		// color
		elements['secondary']['color'] = 'h1, h2, h3, h4, h5, .h1, .h2, .h3, .h4, .h5, .block__item--generic .block__content:hover h2, .block__item--generic .block__content:focus h2, .block__item--generic .block__content:hover .block__link, .block__item--generic .block__content:focus .block__link, .block__content:hover h2, .block__content:focus h2, .btn_outlined:hover, .btn_outlined:focus, blockquote, .sidebar a:hover, .sidebar .active > a:hover, .sidebar .active > a:focus';

		// fill
		elements['secondary']['fill'] = '.block__item--generic .block__content:hover .block__link .icon svg path, .block__item--generic .block__content:focus .block__link .icon svg path, .btn_outlined:hover i path, .btn_outlined:focus i path';

	/* 
		tertiary color element selectors
	*/

		// background
    	elements['tertiary']['background'] = '.bg-tertiary, .sidebar > li:first-child, .donation-type__wrapper, .panel-location .panel-heading.active a, .panel-location .panel-collapse, .btn_outlined, .btn_outlined:focus, .btn_outlined:hover, select';

	/* 
		text color element selectors
	*/

		// color
    	elements['text']['color'] = 'body, .sidebar a, .process-step, .job-post h3, .panel-location .panel-heading.active a, .block__content, .block__content:hover, .block__content:focus, .block__item--generic .block__content h2';

    /*
    	wordpress customize functions
    */

	 	// primary color setting changed in customizer
		wp.customize('custom_primary', function( value ) {
		    value.bind( function( color ) {
		    	// build up the css for primary colors
		    	css['primary'] = '';
		        css['primary'] += elements['primary']['background'] + '{ background-color: ' + color + '; }\n\r';
		        css['primary'] += elements['primary']['color'] + '{ color: ' + color + '; }\n\r';
		        css['primary'] += elements['primary']['border'] + '{ border-color: ' + color + '; }\n\r';
		        css['primary'] += elements['primary']['fill'] + '{ fill: ' + color + '; }\n\r';

		        // update style block in head
		        updateStyleBlock();
		    });
		});

		// secondary color setting changed in customizer
		wp.customize('custom_secondary', function( value ) {
		    value.bind( function( color ) {
		    	// build up the css for secondary colors
		    	css['secondary'] = '';
		        css['secondary'] += elements['secondary']['background'] + '{ background-color: ' + color + '; }\n\r';
		        css['secondary'] += elements['secondary']['color'] + '{ color: ' + color + '; }\n\r';
		        css['secondary'] += elements['secondary']['fill'] + '{ fill: ' + color + '; }\n\r';

		        // update style block in head
		        updateStyleBlock();
		    });
		});

		// tertiary color setting changed in customizer
		wp.customize('custom_tertiary', function( value ) {
		    value.bind( function( color ) {
		    	// build up the css for tertiary colors
		    	css['tertiary'] = '';
		        css['tertiary'] += elements['tertiary']['background'] + '{ background-color: ' + color + '; }\n\r';

		        // update style block in head
		        updateStyleBlock();
		    });
		});

		// text color setting changed in customizer
		wp.customize('custom_text', function( value ) {
		    value.bind( function( color ) {
		    	// build up the css for text colors
		    	css['text'] = '';
		        css['text'] += elements['text']['color'] + '{ color: ' + color + '; }\n\r';

		        // update style block in head
		        updateStyleBlock();
		    });
		});

		// fixer css - to fix any inheritance problems
		css['fixer'] = '.btn-list_social-share .btn {background-color: white}';

	/*
		functions
	*/

		// update style block
		function updateStyleBlock() {
			// remove custom style block if it already exists
			$('#customizer-style').remove();
			// generate style block
			var $style = $('<style id="customizer-style">' + css['primary'] + css['secondary'] + css['tertiary'] + css['text'] + css['fixer'] + '</style>'); 
			// append style block to head
			$style.appendTo('head');
		}
 
})( jQuery );