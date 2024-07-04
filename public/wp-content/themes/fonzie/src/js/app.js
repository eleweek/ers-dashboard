/* Fonzie Application
 ========================================================================== */

$(function () {
	/* Global */
	template.media_query();

    /* Application */
    app.donations();

    /* Template */
    template.mobile_menu();
    template.desktop_subnav();
    template.mobile_subnav();
    template.desktop_more_menu();
    template.share_modal();
    template.campaign_progress();
    template.repeater_gallery();
    template.accordion();
    template.panelClass();
		template.archive_filter();
    template.tables();
    template.donationProcess();
		template.logo_carousel();

    var map = $('.acf-map');
    if( map.length > 0 ) {
        map.each(function () {
            // create map
            map = app.new_map($(this));

        });
    }

});
