/* Template: Logo Carousel
   ========================================================================== */

template.logo_carousel_slide = function(slideIndex) {
	var $slide = $('[data-slide=' + slideIndex + ']');

	$('.homepage-logo-carousel-desc__title').text($slide.attr('data-title'));
	$('.homepage-logo-carousel-desc__text').text($slide.attr('data-description'));
	$('.homepage-logo-carousel-desc__link-text').text($slide.attr('data-link-text'));
	$('.homepage-logo-carousel-desc__link').attr('href', $slide.attr('data-url'));

	if ( $slide.attr('data-show-link') == '1' ) {
		$('.homepage-logo-carousel-desc__link-container').show();
	} else {
		$('.homepage-logo-carousel-desc__link-container').hide();
	}
};

template.logo_carousel = function() {
	'use strict';

	var $logoCarousel = $('.homepage-logo-carousel .slick-slider');

  $logoCarousel.slick({
		variableWidth: true,
	  centerMode: true,
	  slidesToShow: 6,
		draggable: false,
		appendArrows: false,
		prevArrow: '.slick-prev',
		nextArrow: '.slick-next',
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        centerMode: true,
	        slidesToShow: 5,
					draggable: false
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        centerMode: true,
	        slidesToShow: 1,
					draggable: false
	      }
	    }
	  ]
  });

	$('.homepage-logo-carousel__item').click(function(e) {
		e.preventDefault();

		var slide = $(this).attr('data-slide');

		$logoCarousel.slick('slickGoTo', slide);
	});

	$logoCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		template.logo_carousel_slide(nextSlide);
	});

	template.logo_carousel_slide(0);
};
