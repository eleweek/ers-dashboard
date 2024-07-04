<?php 
	// get images array from acf
	$images = get_sub_field('gallery');

	// generate images markup
	$imagesMarkup = '';
	if ($images) {
		foreach ($images as $image) {
			$imagesMarkup .= '<!-- .item -->';
			$imagesMarkup .= '<div class="item">';
			$imagesMarkup .= 	'<div class="img-fill"><img src="' . $image['url'] . '" alt="' . $image['alt'] . '"></div>';
			$imagesMarkup .= '</div>';
			$imagesMarkup .= '<!-- /.item -->';
			$imagesMarkup .= "\r\n";
		}
	}

	// generate thumbnails markup
	$thumbnailsMarkup = '';
	if ($images) {
		foreach ($images as $image) {
			// $thumbnailsMarkup .= '<!-- .item -->';
			$thumbnailsMarkup .= '<div class="item">';
			$thumbnailsMarkup .= 	'<div class="img-fill"><img src="' . $image['sizes']['medium'] . '" alt="' . $image['alt'] . '"></div>';
			$thumbnailsMarkup .= '</div>';
			// $thumbnailsMarkup .= '<!-- /.item -->';
			$thumbnailsMarkup .= "\r\n";
		}
	}
?>

<div class="row flexible-block">
	<div class="col-xs-12">

		<!-- .gallery-slider -->
		<div class="gallery-slider">

			<!-- __images -->
			<div class="gallery-slider__images">
				<div>
					<?php echo $imagesMarkup; ?>
				</div>
				<button class="prev-arrow slick-arrow"><?php include( fonzie_svg_path( "chevron-left.svg" ) ); ?></button>
				<button class="next-arrow slick-arrow"><?php include( fonzie_svg_path( "chevron-right.svg" ) ); ?></button>
				<span class="caption">&nbsp;</span>
			</div>
			<!-- /__images -->


			<!-- __thumbnails -->
			<div class="gallery-slider__thumbnails">
				<div>
					<?php echo $thumbnailsMarkup; ?>
				</div>
		
				<button class="prev-arrow slick-arrow"><?php include( fonzie_svg_path( "chevron-left.svg" ) ); ?></button>
				<button class="next-arrow slick-arrow"><?php include( fonzie_svg_path( "chevron-right.svg" ) ); ?></button>
			</div>
			<!-- /__thumbnails -->

		</div>
		<!-- /.gallery-slider -->

	</div>
</div>