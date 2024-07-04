<?php
/**
 * Template Name: Voting Type
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

				<?php
					if ( get_depth() === 0 ) :
						$sub_pages = get_pages( array(
							'child_of' => $post->ID,
							'parent' => $post->ID,
							'sort_column' => 'menu_order',
							'depth' => 0
						) );
					else :
						$sub_pages = get_pages( array(
							'child_of' => $post->post_parent,
							'parent' => $post->post_parent,
							'sort_column' => 'menu_order',
							'depth' => 0
						) );
					endif;

					$content_block_class = '';

					if ( $sub_pages ):
						$content_block_class = ' content-block--sidebar';
						$classes = ' col-lg-8';
					else:
						$classes = ' col-lg-8 col-lg-offset-2';
					endif;
				?>

				<div class="content-block<?php echo $content_block_class; ?>">
					<div class="row">

						<?php if ( $sub_pages ): ?>
							<aside class="col-lg-3">

								<?php
									$ancestors = array_reverse( get_post_ancestors( $post->ID ) );

									if ( get_depth() === 0 ) {
										$topLevelParentID = $post->ID;
									} else {
										$topLevelParentID = $ancestors[0];
									}
								?>

								<ul class="sidebar desktop-subnav">

									<li<?php if( $topLevelParentID === $post->ID ): ?> class="active"<?php endif; ?>>
										<a href="<?php echo get_permalink( $topLevelParentID ); ?>">
											<?php echo get_the_title( $topLevelParentID ); ?>
										</a>
									</li>

									<?php
										if( get_depth() == 0 || get_depth() == 1 ):
											foreach( $sub_pages as $page ):
												$parent = $page->ID;
												$post_parent = $page->ID;

												include( locate_template( 'template-parts/subnav_list.php' ) );
											endforeach;
										else:
											$parent = $post->post_parent;
											$post_parent = $post->post_parent;

											include( locate_template( 'template-parts/subnav_list.php' ) );
										endif;
									?>

								</ul><!-- /.sidebar -->

								<?php
								$parent = $post->ID;
								$post_parent = $post->ID;

								if( count( get_pages( array( 'parent' => $parent ) ) ) > 0 ):
									?>
									<div class="row">
										<ul class="sidebar mobile-subnav">
											<?php include( locate_template( 'template-parts/subnav_list.php' ) ); ?>
										</ul>
									</div>
									<?php
								endif;
								?>

							</aside><!-- /.col -->
						<?php endif; ?>

						<div class="content<?php echo $classes; ?>">
							<h1 class="page-title heading_pull-top"><?php the_title(); ?></h1>

							<?php if( get_field( 'page_intro_content' ) ) : ?>
							<div class="section-intro--text">
								<?php
									echo get_field( 'page_intro_content' );
								?>
							</div>
							<?php endif; ?>
							
						
							
<?php get_template_part( 'template-parts/social-share' ); ?>
							<?php
							if ( have_rows('flexible_content_area') ):
								while ( have_rows('flexible_content_area') ) : the_row();
									$layout = get_row_layout();

									get_template_part( 'flexible/layout', $layout );
								endwhile;
							endif;
							?>
							<?php get_template_part( 'template-parts/social-share' ); ?>
						</div><!-- /.col -->

					</div><!-- /.row -->
				</div><!-- /.content-block -->


			<?php endwhile; endif; ?>


		</main><!-- #main -->
	</div>
</div><!-- #primary -->

<?php
get_footer();
