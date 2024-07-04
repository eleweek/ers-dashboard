/* Template: Example function
 ========================================================================== */

template.mobile_menu = function() {
    'use strict';

    var $menu_toggle = $('.menu-toggle'),
        $site_navigation = $('#site-navigation'),
        $menu_title = $('.menu-title'),
        $has_children = $('.page_item_has_children > a, .menu-item-has-children > a'),
        $search_toggle = $('.search-toggle'),
        $menu_title_text = 'Menu',
        $menu_title_text_close = 'Close Menu',
        $search_title_text = 'Search',
        $search_title_text_close = 'Close',
        $supports_touch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    $menu_toggle.click(function() {
        $site_navigation.removeClass('open-search').toggleClass('open');

        if ($site_navigation.hasClass('open')) {
            $menu_title.html($menu_title_text_close);
            $search_toggle.html($search_title_text);
        } else {
            $menu_title.html($menu_title_text);
        }

    });

    $has_children.click(function(e) {

        var $this = $(this);
        var mq = template.media_query();

        // if its a touch device (mobile, tablet) or mobile media query
        if ($supports_touch || ['xs','sm','md'].indexOf(mq) !== -1) {
            // if it's child menu is not open, open it
            if (!$this.parent().hasClass('open')) {
                e.preventDefault();
                $this.parent().addClass('open');
            }
            // otherwise just fire the link
        }

    });

    $search_toggle.click(function() {
        $site_navigation.removeClass('open').toggleClass('open-search');

        if ($site_navigation.hasClass('open-search')) {
            $search_toggle.html($search_title_text_close);
            $menu_title.html($menu_title_text);
        } else {
            $search_toggle.html($search_title_text);
        }
    });

	var dragging = false;
	$(document).on("touchmove", function(){
		dragging = true;
	});

    $(document).on('click touchend', function(event) {

		if (dragging) {
			dragging = false;
          	return;
		}

        if($(event.target).closest('#site-navigation').length === 0) {
             $site_navigation.removeClass('open').removeClass('open-search');
             $search_toggle.html($search_title_text);
             $menu_title.html($menu_title_text);

             
             $('#site-navigation').find('input').blur();
        }

    });

};
