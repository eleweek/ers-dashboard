<?php
/**
 * Template Name: Feature Board
 */

get_header(); ?>

<div id="primary" class="content-area">
	<div class="container-fluid">
		<main id="main" class="site-main" role="main">

			<?php
		 		locate_template( 'template-parts/page_intro.php', true );

				$taxonomy = 'feature-category';
				$terms = get_terms( $taxonomy, [
				  'hide_empty' => true // hide empty terms
				]);
				$filter_term = ( isset($_GET[$taxonomy]) ) ? $_GET[$taxonomy] : false;
				$url = remove_query_arg( $taxonomy , get_permalink() );

				/**
				 * Designate appropriate query separator if 'lang'
				 * query param is present.
				 */
				$query_separator = ( $_GET['lang'] ) ? '&' : '?';

				$class = ( !$filter_term ) ? 'btn active' : 'btn' ;
		 	?>

			<div class="feature-board">
				<div class="feature-board__filter">
					<a class="<?php echo $class; ?>" href="<?php echo $url; ?>">All</a>

					<?php
						$term_slugs = array();

						foreach( $terms as $term ) {
			    			$term_slugs[] = $term->slug;
							$class = ($term->slug === $filter_term) ? 'btn active' : 'btn' ;
					?>

						<a class="<?php echo $class; ?>" href="<?php echo $url .  $query_separator . $taxonomy . '=' . $term->slug; ?>">
							<?php echo $term->name; ?>
						</a>

					<?php
						}
					?>
				</div><!-- /.feature-board__filter -->

				<div class="feature-board__content">
					<div class="row">
						<?php
							$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

							if ( $filter_term ) :

								$args = array(
									'tax_query' => array(
										array(
											'taxonomy' => $taxonomy,
											'field' => 'slug',
											'terms' => $filter_term
										)
									),
									'posts_per_page' => 12,
									'paged' => $paged
								);

							else :
								$args = array(
									'tax_query' => array(
										array(
											'taxonomy' => $taxonomy,
											'field' => 'slug',
											'terms' => $term_slugs
										)
									),
									'posts_per_page' => 12,
									'paged' => $paged
								);
							endif;


							// The Query
							query_posts( $args );

							// The Loop
							while ( have_posts() ) : the_post();
								$_event_related = false;
								$_event_related_tag_image_block = false;

								if ( has_post_thumbnail() ) {
									$_block__text_bottom = true;
								} else {
									$_block__text_bottom = false;
								}

								include( locate_template( 'loop-parts/list-type/listing-grid.php' ) );
							endwhile;

						?>
					</div>
				</div><!-- /.feature-board__content -->

				<?php
					if ( function_exists( 'wp_bootstrap_pagination' ) ):
						echo '<div class="feature-board__pagination">';
							wp_bootstrap_pagination();
						echo '</div><!-- /.feature-board__pagination -->';
					endif;

					wp_reset_query();
				?>
			</div><!-- /.feature-board -->

		</main><!-- #main -->
	</div>
</div><!-- #primary -->

<?php get_footer(); ?>
