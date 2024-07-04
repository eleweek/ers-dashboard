<div class="block-404 content-block col-md-8 col-md-push-2">

	<h1 class="heading_pull-top">
		<?php
		if( get_field( 'not_found_title', 'option' ) ):
			the_field( 'not_found_title', 'option' );
		else:
			_e('Sorry, we can\'t find the page you\'re looking for');
		endif;
		?>
	</h1>

	<h2 class="heading_pull-top">
		<?php
		if( get_field( 'not_found_subtitle', 'option' ) ):
			the_field( 'not_found_subtitle', 'option' );
		else:
			_e('The page might have been moved or deleted.<br>Try searching below to find what you need.');
		endif;
		?>
	</h2>

	<?php get_search_form(); ?>

	<div class="intro-block intro-block_404">
		<p>Still Struggling? You can always contact us.</p>
		<?php if ( get_field('contact_page', 'options') ) : ?>
			<a href="<?php the_field('contact_page', 'options'); ?>" class="btn">Talk to us</a>
		<?php endif; ?>
	</div>

</div>