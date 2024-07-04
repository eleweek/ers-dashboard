<?php
/**
 * Template Name: Contact Page
 */

get_header(); ?>


<div id="primary" class="content-area">
	<div class="container-fluid">
		<main id="main" class="site-main" role="main">

			<div class="row">
				<div class="col-xs-12">
					<?php
					if ( have_posts() ) :

						$_intro_align = 'center';
						include( locate_template( 'template-parts/page_intro.php') );

					endif;
					?>
				</div>
			</div>

			<div class="row content-block">
				<div class="col-lg-7 contact-form">
					<?php
					if ( have_rows('main_content') ):
						while ( have_rows('main_content') ) : the_row();
							$layout = get_row_layout();

							get_template_part( 'flexible/layout', $layout );
						endwhile;
					endif;
					?>
				</div>

				<div class="col-lg-4 col-lg-offset-1">
					<?php
					if ( have_rows('right_sidebar') ):
						while ( have_rows('right_sidebar') ) : the_row();
							$layout = get_row_layout();

							get_template_part( 'flexible/layout', $layout );
						endwhile;
					endif;
					?>

				</div>
			</div>

		</main><!-- #main -->
	</div>
</div><!-- #primary -->

<?php get_footer(); ?>
