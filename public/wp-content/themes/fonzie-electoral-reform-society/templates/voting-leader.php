<?php
/**
 * Template Name: Voting Leader
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

get_header(); ?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<?php get_template_part( 'components/voting', 'hero' ); ?>

		<div class="container-fluid">

			<?php get_template_part( 'components/voting', 'filter' ); ?>

			<?php get_template_part( 'components/voting', 'children' ); ?>

			<?php get_template_part( 'components/action', 'cta' ); ?>

		</div>

		<?php endwhile; endif; ?>

	</main><!-- #main -->

</div><!-- #primary -->

<?php
get_footer();
