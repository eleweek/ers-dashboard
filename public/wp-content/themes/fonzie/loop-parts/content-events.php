<div class="content-block">
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">

			<h1 class="page-title heading_pull-top"><?php the_title(); ?></h1>

			<?php get_template_part( 'template-parts/event-information' ); ?>
			

			<?php if( has_post_thumbnail() ): ?>
				<figure class="featured-image">
					<?php the_post_thumbnail('post-featured-image'); ?>
				</figure>
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

			<?php get_template_part( 'template-parts/event-location' ); ?>

			<?php get_template_part( 'template-parts/social-share' ); ?>
			<?php get_template_part( 'template-parts/tags' ); ?>

		</div>
	</div>
</div>


<?php
$_args = array(
	'posts_per_page' => 2,
	'post_type' => 'events'
);
$_events = new WP_Query( $_args );

if( $_events->have_posts() ):
	?>

	<div class="content-block">
		<div class="row">
			<div class="col-xs-12"><h3><?php _e('See more events...', 'charitypress_fonzie'); ?></h3></div>

			<div class="col-xs-12">
				<?php
				while( $_events->have_posts() ): $_events->the_post();

					locate_template( 'loop-parts/list-type/listing-event.php', true, false );

				endwhile;
				?>
			</div>

			<div class="col-xs-12 text-right">
				<a href="<?php echo get_post_type_archive_link( get_post_type() ); ?>" class="btn btn_right"><?php _e('View all events', 'charitypress_fonzie'); ?></a>
			</div>
		</div>
	</div>

	<?php
endif;
?>
