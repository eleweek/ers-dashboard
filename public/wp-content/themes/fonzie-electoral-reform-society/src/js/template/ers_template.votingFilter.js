/* Template: Voting filter
   ========================================================================== */

'use strict';
ers_template.votingFilter = () => {

	const $form = $('#voting-filter-form'),
		//$select = $('#voting-filter-select'),
		$button = $form.find('button');

	$button.hide();

	$('.voting-leader__item').css('height', 'auto');

	// $select.change(function() {
	// 	this.form.submit();
	// });

	if ($(window).width() > 767) {
		var elementHeights = $('.voting-leader__item').map(function() {
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
	$('.voting-filter').on('click', '.voting-filter__btn', function(e) {
		e.preventDefault();

		$('.voting-filter__btn').removeClass('voting-filter__btn--active');
		$(this).addClass('voting-filter__btn--active');

		var sortByValue = $(this).attr('data-sort-by');
		$grid.isotope({sortBy: [sortByValue, 'title']});

		$('#voting-filter-select').val(sortByValue + '_rating');
	});

	$('.voting-filter').on('change', '#voting-filter-select', function(e) {
		e.preventDefault();
		var sortByValue = $(this).find(':selected').attr('data-sort-by');
		$grid.isotope({sortBy: sortByValue});

		$('.voting-filter__btn').removeClass('voting-filter__btn--active');
		$('.voting-filter__btn.' + sortByValue).addClass('voting-filter__btn--active');
	});

};
