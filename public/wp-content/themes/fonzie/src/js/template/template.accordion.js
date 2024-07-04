/* Template: Accordion
 ========================================================================== */

template.accordion = function() {

    // if there is at least one accordion element
    if ($('.accordion').length) {

    	// for every accordion (we might want multiple per page)
    	$('.accordion').each(function(index) {

    		var $thisAccordion = $(this);

	    	// get options
	    	var closeOtherItems = $thisAccordion.data('close-other-items') || false;

	    	// user clicks accordion item heading
	    	$thisAccordion.on('click', '.accordion__item__heading', function (e) {
	    		var $this = $(this),
	    			$thisAccordionItem = $this.parent();

	    		// if closed, open the accordion item
	    		if (!$thisAccordionItem.hasClass('accordion__item--open')) {

		    		// if closeOtherItems is true, close any open items
		    		if (closeOtherItems) {
			    		$thisAccordionItem.parent().find('.accordion__item').removeClass('accordion__item--open').find('.accordion__item__content').removeAttr('style');
			    		// remove applied height
		    		}

		    		// open the clicked accordion
		    		$thisAccordionItem.addClass('accordion__item--open');

		    		// set the height
		    		var contentHeight = $thisAccordionItem.find('.accordion__item__content div').innerHeight();
		    		$thisAccordionItem.find('.accordion__item__content').css('height', contentHeight);

	    		}
	    		// else close the accordion item 
	    		else {
		    		$thisAccordionItem.removeClass('accordion__item--open');

		    		// remove applied height
		    		$thisAccordionItem.find('.accordion__item__content').removeAttr('style');
	    		}
	    	});

    	});

    }

};