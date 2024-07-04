/* Template: Date Picker
 ========================================================================== */

template.archive_filter = function () {

    var url = utils.parseURL(location.href);

    var daterangePast = $('.daterange-past').daterangepicker({
            "alwaysShowCalendars": true,
            "locale": {
                format: 'DD/MM/YY'
            },
            "ranges": {
                "Today": [
                    moment(),
                    moment()
                ],
                "Yesterday": [
                    moment().subtract(1, 'days'),
                    moment().subtract(1, 'days')
                ],
                "Previous 7 Days": [
                    moment(),
                    moment().subtract(7, 'days'),
                ],
                "Previous 30 Days": [
                    moment(),
                    moment().subtract(30, 'days')
                ],
                "Previous Month": [
                    moment().subtract(1, 'month').startOf('month'),
                    moment().subtract(1, 'month').endOf('month')
                ],
            },
        }
    );

    if (daterangePast.length > 0 && typeof url.params.startDate !== 'undefined') {
        daterangePast.data('daterangepicker').setStartDate(moment(url.params.startDate));
        daterangePast.data('daterangepicker').setEndDate(moment(url.params.endDate));
    }

    daterangePast.on('apply.daterangepicker', function (ev, picker) {

        url.params.startDate = picker.startDate.format('YYYY-MM-DD');
        url.params.endDate = picker.endDate.format('YYYY-MM-DD');

        location = url.protocol + '://' + url.host + url.path + '?' + $.param(url.params);

    });

    var daterange = $('.daterange').daterangepicker({
            "alwaysShowCalendars": true,
            "locale": {
                format: 'DD/MM/YY'
            },
            "ranges": {
                "Today": [
                    moment(),
                    moment()
                ],
                "Tomorrow": [
                    moment().add(1, 'days'),
                    moment().add(1, 'days')
                ],
                "Next 7 Days": [
                    moment(),
                    moment().add(7, 'days'),
                ],
                "Next 30 Days": [
                    moment(),
                    moment().add(30, 'days')
                ],
                "Next Month": [
                    moment().add(1, 'month').startOf('month'),
                    moment().add(1, 'month').endOf('month')
                ],
            }
        }
    );

    if (daterange.length > 0 && typeof url.params.startDate !== 'undefined') {
        daterange.data('daterangepicker').setStartDate(moment(url.params.startDate));
        daterange.data('daterangepicker').setEndDate(moment(url.params.endDate));
    }

    daterange.on('apply.daterangepicker', function (ev, picker) {

        url.params.startDate = picker.startDate.format('YYYY-MM-DD');
        url.params.endDate = picker.endDate.format('YYYY-MM-DD');

        location = url.protocol + '://' + url.host + url.path + '?' + $.param(url.params);

    });

    $('select.category-select').on('change', function() {

        var value = $(this).val(),
            termName = $(this).attr('name');

        url.params[termName] = value;

        location = url.protocol + '://' + url.host + url.path.replace(/\/page\/(\d+)\/?/i, "/") + '?' + $.param(url.params);

    });

    // submit filters if enter pressed
    $('.daterangepicker').on('keyup', '.input-mini', function(event) {
        var $this = $(this);
        if (event.keyCode === 13) {
            $this.parents('.daterangepicker').find('.applyBtn').trigger('click');
        }
    });

	$('[name="daterangepicker_start"]').attr('aria-label', 'Date Range Start');
	$('[name="daterangepicker_end"]').attr('aria-label', 'Date Range End');

};
