/* Template: Share Modal
 ========================================================================== */

template.share_modal = function() {
    'use strict';

    $('.modal-btn').click(function(e) {
        e.preventDefault();

        var top = ($(window).height() / 2) - (438 / 2),
            left = ($(window).width() / 2) - (700 / 2);

        window.open(
            $(this).attr('href'),
            'Share',
            'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=700,height=438,top=' + top + ',left=' + left
        );
    });

};