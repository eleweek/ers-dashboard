<?php
/**
 * Template Name: National
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

 get_header(); ?>

 	<div id="primary" class="content-area">

 			<main id="main" class="site-main" role="main">

 				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

					<?php get_template_part( 'components/national', 'hero' ); ?>

					<?php get_template_part( 'components/national', 'text' ); ?>

					<?php get_template_part( 'components/selected', 'pages' ); ?>

					<?php get_template_part( 'components/campaign', 'news' ); ?>

					<?php get_template_part( 'components/campaign', 'events' ); ?>

					<?php get_template_part( 'components/campaign', 'publications' ); ?>

					<?php get_template_part( 'components/campaign', 'briefings' ); ?>

					<?php get_template_part( 'components/team', 'block' ); ?>

 				<?php endwhile; endif; ?>

 			</main><!-- #main -->

 	</div><!-- #primary -->

 <?php
 get_footer();
