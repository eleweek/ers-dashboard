/* Template: Toolbar
   ========================================================================== */

'use strict';

ers_template.toolbar = () => {
	$('.ers-toolbar__search').click(function(e) {
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
