<?php get_header(); ?>

<?php locate_template( 'template-parts/homepage-header.php', true); ?>

<?php
if ( have_rows('homepage_flexible_content_blocks') ):
	while ( have_rows('homepage_flexible_content_blocks') ) : the_row();
		$layout = get_row_layout();

		get_template_part( 'homepage-flexible/layout', $layout );
	endwhile;
endif;
?>

<?php get_footer(); ?>
