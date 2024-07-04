/* Define jQuery in noConflict mode */
$ = jQuery.noConflict();

$(function( $ ) {
    'use strict';

    /*
        acf scripts
    */

        var acfKey;

        $('.acf-field input[maxlength], .acf-field textarea[maxlength]').each(function() {

            var labelContainer = $(this).closest('.acf-field').find('.acf-label'),
                description =  labelContainer.find('.description'),
                remainingStr = '<span class="acf-character-count">Loading...</span><br />';

            if( description.length === 0 ){
                labelContainer.append('<p class="description"></p>');
                description = labelContainer.find('.description');
            }

            description.prepend(remainingStr);

        });

        $('.acf-character-count').each(function() {
            var $field = $(this).closest('.acf-field'),
                $inputfield = $field.find('input[maxlength]'),
                $textarea = $field.find('textarea[maxlength]'),
                $input = ($inputfield.length > 0) ? $inputfield : $textarea,
                acfKey = $field.attr('data-key'),
                max = parseInt($input.attr('maxlength'), 10),
                value = $input.val(),
                remaining = (value) ? max - value.length : max;

            if (remaining === -1) {
                remaining = 0;
            }


            $(this).html('<span class="acf-character-count-number">' + remaining + '</span> characters remaining');

            $(document).on('keyup', 'input, textarea', '.acf-field[data-key="' + acfKey + '"]', function() {
                var value = $(this).val(),
                    max = parseInt($(this).attr('maxlength'), 10),
                    remaining = max - value.length;

                if (remaining === -1) {
                    remaining = 0;
                }

                $(this).closest('.acf-field').find('.acf-character-count').html('<span class="acf-character-count-number">' + remaining + '</span> characters remaining');
            });
        });

  /*
      customizer scripts
  */

      // on theme select box change
      $('.wp-customizer').on('change', '#customize-control-colour_scheme select', function (e) {
          checkColorTheme();
      });

      // on section load
      $('.wp-customizer').on('click', '#accordion-section-colors', function (e) {
          checkColorTheme();
      });

      // check selected color theme and either show or hide the custom theme color pickers
      function checkColorTheme() {
          var colourScheme = $('#customize-control-colour_scheme select').val();
          if (colourScheme === 'custom-theme') {
              showCustomThemeColorPickers();
          }
          else {
              hideCustomThemeColorPickers();
          }
      }

      // show custom theme color pickers
      function showCustomThemeColorPickers() {
          $('.customize-control-color').attr('style', 'display: list-item !important');
      }

      // hide custom theme color pickers
      function hideCustomThemeColorPickers() {
          $('.customize-control-color').attr('style', 'display: list-item');
      }

});
