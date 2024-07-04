/* Template: Repeater - gallery
 ========================================================================== */

template.repeater_gallery = function() {

	/*
		variables
	*/
		var sliders = $(".gallery-slider");

		sliders.each(function() {

			$currentSlider = $(this);

			var $imagesSlider = $currentSlider.find(".gallery-slider__images>div"),
				$thumbnailsSlider = $currentSlider.find(".gallery-slider__thumbnails>div");

		/*
			sliders
		*/

			// images options
			$imagesSlider.slick({
				dots: true,
				speed:300,
				slidesToShow:1,
				slidesToScroll:1,
				cssEase:'linear',
				fade:true,
				draggable:false,
				asNavFor: $currentSlider.find(".gallery-slider__thumbnails>div"),
				prevArrow: $currentSlider.find(".gallery-slider__images .prev-arrow"),
				nextArrow: $currentSlider.find(".gallery-slider__images .next-arrow")
			});

			// thumbnails options
			$thumbnailsSlider.slick({
				dots: true,
				autoplay:false,
				speed:300,
				slidesToShow:5,
				slidesToScroll:1,
				cssEase:'linear',
				centerMode: true,
				draggable:false,
				focusOnSelect:true,
				asNavFor: $currentSlider.find(".gallery-slider__images>div"),
				prevArrow: $currentSlider.find(".gallery-slider__thumbnails .prev-arrow"),
				nextArrow: $currentSlider.find(".gallery-slider__thumbnails .next-arrow"),
				responsive: [
					{
						breakpoint: 720,
						settings: {
							centerMode: true,
							slidesToShow: 3,
							slidesToScroll: 3
						}
					}
				]
			});

		/*
			captions
		*/

			var $caption = $currentSlider.find('.caption');

			// get the initial caption text
			var captionText = $currentSlider.find('.gallery-slider__images .slick-current img').attr('alt');
			updateCaption($caption, captionText);

			// hide the caption before the image is changed
			$imagesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$(event.target).next('.caption').addClass('hide');
			});

			// update the caption after the image is changed
			$imagesSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
				captionText = $(event.target).find('.slick-current img').attr('alt');
				$caption 	= $(event.target).next('.caption');
				updateCaption($caption, captionText);
			});

			function updateCaption(container, text) {
				// if empty, add a no breaking space
				if (text === '') {
					text = '&nbsp;';
				}
				container.html(text);
				container.removeClass('hide');
			}

			$currentSlider.find('button.prev-arrow').attr('aria-label', 'Previous Slide');
			$currentSlider.find('button.next-arrow').attr('aria-label', 'Next Slide');


		});

};
