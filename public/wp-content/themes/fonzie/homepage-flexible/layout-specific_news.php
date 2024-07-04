<section class="specific-news-block">

	<div class="specific-news-block-bg specific-news-block-bg--left"></div>
	<div class="specific-news-block-bg specific-news-block-bg--right"></div>

	<div class="container-fluid">

		<div class="row">

			<div class="col-lg-6">

				<div class="specific-news-block__section specific-news-block__section--main">

					<h2 class="specific-news-block__heading">
						<?php the_sub_field('specific_news_title'); ?>
					</h2>

					<?php the_sub_field('specific_news_text'); ?>

				</div>

			</div>

			<div class="col-lg-6">

				<div class="specific-news-block__section specific-news-block__section--news homepage-latest-news">

					<?php
					$news_items = get_sub_field('specific_news_items');

					if( $news_items ): ?>

					    <?php foreach( $news_items as $post): ?>

					        <?php setup_postdata($post); ?>

							<div class="block__item block__item--double block__item--latest block__item--latest-home">

								<?php get_template_part( 'components/new', 'block-item' ); ?>

							</div>

					    <?php endforeach; ?>

					    <?php wp_reset_postdata(); ?>

					<?php endif; ?>

				</div>

			</div>

		</div>

		<?php
		switch( get_sub_field('specific_news_button_link_location') ){
			case '1':
				$_url = get_sub_field('specific_news_button_link_internal');
				break;
			case '2':
				$_url = get_sub_field('specific_news_button_link_external');
				break;
		}
		?>

		<div class="text-center">

			<a href="<?php echo $_url; ?>" class="btn specific-news-block__btn">
				<?php the_sub_field('specific_news_button_text'); ?> >
			</a>

		</div>

	</div>

</section>
