/* Template logic: Tables
   ========================================================================== */

template.tables = function() {
    var $table = $('.content-area table'),
        $tableRows = $('.content-area tbody tr');

    if ($table.length) {
        $table.each(function() {
            var cellCount = $(this).find('tr:first td').length;

            if (cellCount >= 5) {
                $(this).addClass('table--sm');
            }
        });

        $tableRows.each(function() {
            var cells = $(this).find('td').length;

            for (var i = 0; i < cells; i++) {
                headValue = $(this).closest('table').find('thead th, thead td').eq(i).text();
                cellText = $(this).find('td:eq(' + i + ')').text().split(' ');

                if (headValue) {
                    $(this).find('td:eq(' + i + ')').addClass('table__cell--meta').attr('data-meta', headValue);
                }
            }
        });
    }
};