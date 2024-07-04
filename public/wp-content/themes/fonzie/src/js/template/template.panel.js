/* Template: Panel collapse
 ========================================================================== */

template.panelClass = function() {
    'use strict';

    jQuery('.panel-heading a').click(function() {
        if( $(this).parents('.panel-heading').hasClass('active') )
        {
            $(this).parents('.panel-heading').removeClass('active');
        }else{
            $('.panel-heading').removeClass('active');
            $(this).parents('.panel-heading').addClass('active');
        }
    });

};
