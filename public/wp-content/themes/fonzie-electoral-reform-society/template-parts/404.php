<div class="block-404 content-block col-md-8 col-md-push-2">

    <?php $archive_url = 'http://archive.' . str_replace("www.","", $_SERVER['HTTP_HOST']) . $_SERVER['REQUEST_URI']; ?>

	<h1 class="heading_pull-top">
		<?php
		if( get_field( 'not_found_title', 'option' ) ):
			echo get_field( 'not_found_title', 'option' );
		else:
			_e('Sorry, we can\'t find the page you\'re looking for');
		endif;
		?>
	</h1>

	<h2 class="heading_pull-top">
		<?php
		if( get_field( 'not_found_subtitle', 'option' ) ):
			echo get_field( 'not_found_subtitle', 'option' );
		else:
			_e('The page might have been deleted or moved');
		endif;
		?>
	</h2>
    <p class="h3">Try searching our site below to find what you need.</p>

	<?php get_search_form(); ?>

	<div class="intro-block intro-block_404">
		<p>Still Struggling? You can always contact us.</p>
		<?php if ( get_field('contact_page', 'options') ) : ?>
			<a href="<?php echo get_field('contact_page', 'options'); ?>" class="btn">Talk to us</a>
		<?php endif; ?>
	</div>

</div>