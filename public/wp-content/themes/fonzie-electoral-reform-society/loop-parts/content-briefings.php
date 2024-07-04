<?php
	$featuredImageSwitch = get_field('featured_image_switch');
?>

<div class="content-block">
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">

			<?php icl_post_languages(); ?>
			<h1 class="page-title heading_pull-top"><?php the_title(); ?></h1>

			<?php news_posted_at_long(); ?>

			<?php if ( $featuredImageSwitch && has_post_thumbnail() ): ?>
				<figure class="featured-image">
					<?php the_post_thumbnail( 'post-featured-image' ); ?>
				</figure>
			<?php endif; ?>

			<?php
			if ( have_rows('flexible_content_area') ):
				while ( have_rows('flexible_content_area') ) : the_row();
					$layout = get_row_layout();

					get_template_part( 'flexible/layout', $layout );
				endwhile;
			else :
					the_content();
			endif;
			?>

			<?php get_template_part( 'template-parts/social-share' ); ?>
			<?php get_template_part( 'template-parts/tags' ); ?>

		</div>
	</div>
</div>


<?php
$_args   = array(
	'posts_per_page' => 2,
	'post_type'      => 'briefings',
	'post__not_in'		 => array($post->ID)
);
$_events = new WP_Query( $_args );

if ( $_events->have_posts() ):
	?>

	<div class="content-block">
		<div class="row">
			<div class="col-xs-12"><h3><?php _e( 'Read more posts...', 'charitypress_fonzie' ); ?></h3></div>

			<div class="col-xs-12">
				<?php
				while ( $_events->have_posts() ): $_events->the_post();

					locate_template( 'loop-parts/list-type/listing-post.php', true, false );

				endwhile;
				?>
			</div>

			<div class="col-xs-12 text-right">
				<a href="<?php echo get_permalink( get_option( 'page_for_posts', true ) ); ?>" class="btn btn_right"><?php _e( 'View all posts', 'charitypress_fonzie' ); ?></a>
			</div>
		</div>
	</div>

	<?php
endif;
?>
