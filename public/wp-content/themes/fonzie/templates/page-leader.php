<?php
/**
 * Template Name: Leader
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<div class="container-fluid">
			<main id="main" class="site-main" role="main">



				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

					<div class="intro-block intro-block--leader">
						<div class="row">
							<div class="col-xs-12 col-md-8 col-md-push-2">
									<h1><?php the_title(); ?></h1>
									<div class="section-intro--text">
										<?php echo get_field( 'page_intro_content' ); ?>
									</div>
							</div><!-- /.col -->
						</div><!-- /.row -->
					</div><!-- /.intro-block -->


					<div class="leader-block col-md-10 col-md-offset-1">
						<div class="row">

							<?php
							$count    = 0;
							$args = array(
									'post_type'      => 'page',
									'posts_per_page' => -1,
									'post_parent'    => $post->ID,
									'order'          => 'ASC',
									'orderby'        => 'menu_order'
							 );

							$parent = new WP_Query( $args );

							// calculate an offset to centre the grid items
							// if there are only 1 or 2 items
							$post_count = $parent->post_count;
							if ($post_count === 1) {
								$column_width = 8;
								$column_offset = 2;
							}
							elseif ($post_count === 2) {
								$column_width = 6;
								$column_offset = 0;
							}
							else {
								$column_width = 4;
								$column_offset = 0;
							}

							if ( $parent->have_posts() ) : ?>

								<?php while ( $parent->have_posts() ) : $parent->the_post(); ?>

									<div class="col-md-<?php echo $column_width; ?><?php if ($column_offset > 0 && $count === 0) echo ' col-md-offset-' . $column_offset; ?>">
										<a class="leader-block__item" href="<?php the_permalink(); ?>">
											<?php if( has_post_thumbnail() ): ?>
												<?php the_post_thumbnail('block-image--landscape'); ?>
											<?php else: ?>
												<div class="leader-block__thumb-placeholder">
													<span></span>
												</div>
											<?php endif; ?>
											<h2 class="leader-block__heading"><?php the_title(); ?></h2>
											<?php if(!get_field('leader_turn_off_excerpts', 'options')): ?>
												<p><?php echo limit_words(get_the_excerpt(), '20'); ?></p>
											<?php endif; ?>
										</a>
									</div><!-- /.col -->

									<?php
										$count ++;
										if ( $count % 3 === 0 ) {
											echo '</div><div class="row">';
										}
									?>

								<?php endwhile; ?>


							<?php endif; wp_reset_query(); ?>

						</div><!-- /.row -->
					</div><!-- /.leader-block -->



				<?php endwhile; endif; ?>


			</main><!-- #main -->
		</div>
	</div><!-- #primary -->

<?php
get_footer();
