<?php
/**
 * Template Name: Campaign
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

 get_header(); ?>

 	<div id="primary" class="content-area">

 			<main id="main" class="site-main" role="main">

 				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

					<?php get_template_part( 'components/campaign', 'hero' ); ?>

					<?php get_template_part( 'components/action', 'strip' ); ?>

					<div class="container-fluid">

					<?php icl_post_languages(); ?>

						<div class="row">

							<div class="col-md-8 col-md-offset-2">

								<div class="content-block content-block--campaign">

									<?php
									if ( have_rows('flexible_content_area') ):
										while ( have_rows('flexible_content_area') ) : the_row();
											$layout = get_row_layout();

											get_template_part( 'flexible/layout', $layout );
										endwhile;
									endif;
									?>
<?php get_template_part( 'template-parts/social-share' ); ?>
								</div>

							</div>

						</div>

						<?php get_template_part( 'components/action', 'cta' ); ?>

					</div>

					<div class="container-fluid">

						<h3 class="text-center">More information about <?php the_title(); ?></h3>

					</div>

					<?php get_template_part( 'components/campaign', 'news' ); ?>

					<?php get_template_part( 'components/campaign', 'events' ); ?>

					<?php get_template_part( 'components/campaign', 'publications' ); ?>

					<?php get_template_part( 'components/campaign', 'briefings' ); ?>

 				<?php endwhile; endif; ?>

 			</main><!-- #main -->

 	</div><!-- #primary -->

 <?php
 get_footer();
