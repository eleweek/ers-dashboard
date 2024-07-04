/* Template: Branding Menu
   ========================================================================== */

'use strict';

ers_template.brandingMenu = () => {
	$('.ers-branding__menu').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		$('.menu-toggle').trigger('click');

		if ($('#site-navigation').hasClass('open')) {
			$(this).addClass('ers-branding__menu--active');
		} else {
			$(this).removeClass('ers-branding__menu--active');
		}
	});

	$(document).on('click touchend', function(e) {
		if (!$(e.target).closest('#navbar').length) {
			$('.ers-branding__menu').removeClass('ers-branding__menu--active');
		}

		if (!$(e.target).closest('.ers-toolbar').length) {
			$('.ers-toolbar').removeClass('ers-toolbar--active');
			$('#toolbar-search').attr('aria-hidden', 'true');
		}
	});
};
