<!-- modification of homepage-flexible/layout-selected_pages -->

<?php
	$ers_campaign_more_link = get_field('selected_pages_see_all_link');
	if( get_field('link_to') === 'External Link' ) {
		$ers_campaign_more_link = get_field('selected_pages_see_all_link_external');
	}
?>

<section class="selected-pages selected-pages--inpage">

	<!-- .container-fluid -->
	<div class="container-fluid">

		<div class="campaign-info-block__header">

			<h4 class="campaign-info-block__title campaign-info-block__title--national">
				<?php echo get_field('selected_pages_block_title'); ?>
			</h4>

			<a href="<?php echo $ers_campaign_more_link; ?>" class="btn btn_outlined campaign-info-block__btn"><?php echo esc_html__( 'See all campaigns' ); ?></a>

		</div>

		<div class="block__row">

			<?php
			while ( have_rows('selected_pages_pages') ) : the_row();

				$post = get_sub_field('selected_pages_page');

					setup_postdata($post); ?>

					<div class="block__item block__item--third block__item--page">
						<a href="<?php the_permalink(); ?>" class="block__content">
							<h3><?php echo get_the_title(); ?></h3>
							<?php the_excerpt(); ?>
							<div class="block__link"><?php echo esc_html__( 'Read more' ); ?> ></div>
						</a>
					</div>

					<?php wp_reset_postdata(); ?>

			<?php endwhile; ?>

		</div>

	</div>
	<!-- /.container-fluid -->

</section>
