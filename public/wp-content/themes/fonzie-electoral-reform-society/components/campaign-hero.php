<?php
if ( has_post_thumbnail() ) {
	$thumb_class = ' campaign-hero--image';
	$thumb_bg = 'background-image: url(' . get_the_post_thumbnail_url($post->ID, "block-hero-full") . ')';
} else {
	$thumb_class = '';
	$thumb_bg = '';
}
?>

<div
class="campaign-hero<?php echo $thumb_class; ?>"
style="<?php echo $thumb_bg; ?>">

	<?php if ( has_post_thumbnail() ) : ?>
		<div class="campaign-hero__overlay"></div>
	<?php endif; ?>

	<div class="campaign-hero__content">

		<h1 class="campaign-hero__title"><?php the_title(); ?></h1>

		<?php if( get_field( 'page_intro_content' ) ) : ?>
			<div class="campaign-hero__text">
				<?php echo get_field( 'page_intro_content' ); ?>
			</div>
		<?php endif; ?>

	</div>

</div>
