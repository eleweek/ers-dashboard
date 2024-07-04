<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

?>

<?php

// get all the acf variables we'll need
$startDate        = DateTime::createFromFormat( 'Ymd', get_field( 'start_date' ) );
$endDate          = DateTime::createFromFormat( 'Ymd', get_field( 'end_date' ) );
$startTime        = get_field( 'start_time' );
$endTime          = get_field( 'end_time' );
$locationName     = get_field( 'location_name' );
$locationPostcode = get_field( 'location_postcode' );
$location         = get_field( 'map' );

// is it a single or multi date event? ($dateType)
$dateType = ( $startDate && $endDate ) ? 'multiple' : 'single';

// does it have a location? ($hasLocation)
$hasLocation = ($locationName && $locationPostcode );

if ( has_post_thumbnail() ):

	$_classes = isset( $_classes ) ? $_classes : '';

	$_img_string = '<img src="%s" alt="%s" %s/>';
	$_thumb_id   = get_post_thumbnail_id();

	$_img_src  = wp_get_attachment_image_src( $_thumb_id, 'event--listing' );
	$_img_alt  = get_post_meta( $_thumb_id, '_wp_attachment_image_alt', true );
	$_images[] = sprintf( $_img_string, $_img_src[0], $_img_alt, $_classes );

	$_images = implode( '', $_images );

endif;

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'listing-post' ); ?>>
	<div class="listing-post__text listing-post__text--has-date">

		<!-- event date -->
		<div class="event-info">
			<div class="event-info__date">
				<?php if ( $dateType == 'single' ) : ?>
					<span class="larger"><?php echo $startDate->format( 'd' ); ?></span>
					<span class="large light"><?php echo $startDate->format( 'M' ); ?></span>
				<?php elseif ( $dateType == 'multiple' ) : ?>
					<span><?php echo $startDate->format( 'd M' ); ?></span>
					<span><?php include( fonzie_svg_path( "long-arrow-right.svg" ) ); ?></span>
					<span><?php echo $endDate->format( 'd M' ); ?></span>
				<?php endif; ?>
			</div>
		</div>
		<!-- /event date -->

		<h2><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
		<?php if ( $hasLocation ) : ?>
			<p class="address"><?php _e( $location['address'], 'charitypress_fonzie' ); ?></p>
		<?php endif; ?>

		<p><?php echo limit_words( get_the_excerpt(), 20 ); ?></p>

	</div>

	<?php if ( has_post_thumbnail() ): ?>
		<a href="<?php the_permalink(); ?>" class="listing-post__image">
			<?php echo $_images; ?>
		</a>
	<?php endif; ?>
</article>

