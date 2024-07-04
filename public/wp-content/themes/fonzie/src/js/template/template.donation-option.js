/* Template: Donation Landing Page
 ========================================================================== */

template.donation_option = function() {
    'use strict';

	var donateTabs = $('.donation-types__tab'),
		donateItems = $('.donation-type');


	donateTabs.on('click', function(e) {
		e.preventDefault();

		var selectedDonateTab = $('.'+$(this).attr('data-tab'));

		donateTabs.removeClass('active');
		$(this).addClass('active');

		donateItems.removeClass('active');
		selectedDonateTab.addClass('active');


	});
};
