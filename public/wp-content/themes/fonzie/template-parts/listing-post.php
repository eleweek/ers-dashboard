<?php
// the id of the wordpress event post
$postId = 240;

// get the default post variables
$title   = get_the_title( $postId );
$excerpt = apply_filters( 'the_excerpt', get_post_field( 'post_excerpt', $postId ) );

// get all the acf variables we'll need
$startDate        = DateTime::createFromFormat( 'Ymd', get_field( 'start_date', $postId ) );
$endDate          = DateTime::createFromFormat( 'Ymd', get_field( 'end_date', $postId ) );
$startTime        = get_field( 'start_time', $postId );
$endTime          = get_field( 'end_time', $postId );
$locationName     = get_field( 'location_name', $postId );
$locationPostcode = get_field( 'location_postcode', $postId );
$location         = get_field( 'map', $postId );

$dateType = ( $startDate && $endDate ) ? 'multiple' : 'single';

// does it have a location? ($hasLocation)
$hasLocation = ( $locationName && $locationPostcode );

?>

<h3>Event listing posts</h3>

<div>
	<div class="listing-post">
		<div class="listing-post__text listing-post__text--has-date">

			<!-- event date -->
			<div class="event-info">
				<div class="event-info__date">
					<?php if ( $dateType == 'single' ): ?>
						<span class="larger"><?php echo $startDate->format( 'd' ); ?></span>
						<span class="large light"><?php echo $startDate->format( 'M' ); ?></span>
					<?php elseif ( $dateType == 'multiple' ): ?>
						<span><?php echo $startDate->format( 'd M' ); ?></span>
						<span><?php include( fonzie_svg_path( "long-arrow-right.svg" ) ); ?></span>
						<span><?php echo $endDate->format( 'd M' ); ?></span>
					<?php endif ?>
				</div>
			</div>
			<!-- /event date -->

			<h2><a href="#"><?php _e( $title, 'charitypress_fonzie' ); ?></a></h2>
			<?php if ( $hasLocation ): ?>
				<p class="address"><?php _e( $location['address'], $postId ); ?></p>
			<?php endif ?>
			<p><?php _e( $excerpt, 'charitypress_fonzie' ); ?></p>
		</div>
		<a href="#" class="listing-post__image">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/jpg/event-listing-post.jpg" alt="">
		</a>
	</div>
	<div class="listing-post">
		<div class="listing-post__text listing-post__text--has-date">

			<!-- event date -->
			<div class="event-info">
				<div class="event-info__date">
					<span class="larger">11</span>
					<span class="large light">Feb</span>
				</div>
			</div>
			<!-- /event date -->

			<h2><a href="#">Thorpe Hall Lights of Love (static)</a></h2>
			<p class="address">Hopewell Town Hall, H20 2NN</p>
			<p>Maecenas faucibus mollis interdum. Maecenas sed diam eget risus varius blandit sit amet non magna.
				Integer posuere erat a ante venenatis dap...</p>
		</div>
		<a href="#" class="listing-post__image">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/jpg/event-listing-post.jpg" alt="">
		</a>
	</div>
	<div class="listing-post">
		<div class="listing-post__text listing-post__text--has-date">

			<!-- event date -->
			<div class="event-info">
				<div class="event-info__date">
					<span>11 Jan</span>
					<span><?php include( fonzie_svg_path( "long-arrow-right.svg" ) ); ?></span>
					<span>17 Jan</span>
				</div>
			</div>
			<!-- /event date -->

			<h2><a href="#">Thorpe Hall Lights of Love (static)</a></h2>
			<p class="address">Hopewell Town Hall, H20 2NN</p>
			<p>Maecenas faucibus mollis interdum. Maecenas sed diam eget risus varius blandit sit amet non magna.
				Integer posuere erat a ante venenatis dap...</p>
		</div>
		<a href="#" class="listing-post__image">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/jpg/event-listing-post.jpg" alt="">
		</a>
	</div>
</div>

<h3>News listing posts</h3>

<div>
	<div class="listing-post">
		<div class="listing-post__text">
			<h2><a href="#">Starlight Hikes fundraising success (static)</a></h2>
			<p>Maecenas faucibus mollis interdum. Maecenas sed diam eget risus varius blandit sit amet non magna.
				Integer posuere erat a ante venenatis dapibus posuere aenean eu leo quam pellentesque ornare sem lacinia
				velit... </p>
			<p class="date">Posted 29 Dec 16</p>
		</div>
		<a href="#" class="listing-post__image">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/jpg/news-listing-post.jpg" alt="">
		</a>
	</div>
</div>


