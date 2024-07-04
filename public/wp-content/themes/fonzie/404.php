<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package CharityPress
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<div class="container-fluid">
			<main id="main" class="site-main" role="main">

			<?php get_template_part( 'template', 'parts/404' ); ?>

		</main><!-- #main -->
	</div>
	</div><!-- #primary -->

<?php
get_footer();
