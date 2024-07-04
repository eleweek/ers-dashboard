<?php
/**
 * The template for displaying search results pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package CharityPress
 */

get_header(); ?>

	<section id="primary" class="content-area">
		<div class="container-fluid">
			<main id="main" class="site-main" role="main">

				<?php if ( have_posts() ) : ?>

					<header class="page-header">
						<h1 class="page-title"><?php printf( esc_html__( 'Results found for: %s', 'charitypress_fonzie' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
					</header><!-- .page-header -->


					<div class="clearfix">

						<?php
						while ( have_posts() ) : the_post();

							$_post_type = get_post_type();

							switch( $_post_type ){
								case 'events':
									locate_template('loop-parts/list-type/listing-event.php', true, false);
									break;
								case 'actions':
								case 'jobs':
								case 'services' :
								case 'post':
								default:
									locate_template('loop-parts/list-type/listing-post.php', true, false);
									break;
							}

						endwhile;
						?>

					</div>

					<?php
					if ( function_exists('wp_bootstrap_pagination') ):
						wp_bootstrap_pagination();
					endif;
					?>

				<?php else : ?>

					<header class="page-header">
						<h1 class="page-title"><?php printf( esc_html__( 'Sorry, we found no matches for: %s', 'charitypress_fonzie' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
					</header><!-- .page-header -->

					<div class="content-block">
						<div class="row">
								<div class="col-xs-12">
									<h3><?php _e('Search again for:', 'charitypress_fonzie'); ?></h3>
									<?php get_search_form(); ?>
								</div>
						</div>
					</div>


				<?php endif; ?>




			</main><!-- #main -->
		</div>
	</section><!-- #primary -->

<?php
get_footer();
