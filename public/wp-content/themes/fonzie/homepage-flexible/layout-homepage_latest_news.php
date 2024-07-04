<?php

$args = array(
	'post_type' => 'post',
	'posts_per_page' => 3
);

$latest_posts = new WP_Query( $args );

?>
<section class="homepage-latest-news padding-top-60 padding-bottom-60">

	<!-- .container-fluid -->
	<div class="container-fluid">

		<?php if( get_sub_field('latest_news_title') ): ?>
			<h2 class="text-center selected-pages__title">
				<?php the_sub_field('latest_news_title'); ?>
			</h2>
		<?php endif; ?>

		<?php if( $latest_posts->have_posts() ):?>
		<div class="block__row">
			<?php
			$count = 0;
			while ( $latest_posts->have_posts() ): $latest_posts->the_post();
				$count++; ?>

				<?php if($count === 1): ?>
					<div class="homepage-latest-news__large-section">
				<?php elseif($count === 2): ?>
					<div>
				<?php endif; ?>
					<div class="block__item block__item--double block__item--latest block__item--latest-home">

						<?php get_template_part( 'components/new', 'block-item' ); ?>

					</div>
				<?php if($count === 1 || $count === 3): ?>
					</div>
				<?php endif; ?>
			<?php endwhile; ?>
			<?php wp_reset_query(); ?>
		</div>
		<div class="text-center homepage-latest-news__button">
			<a href="<?php echo get_permalink( get_option( 'page_for_posts', true ) ); ?>" class="btn"><?php echo esc_html__( 'Read the latest news and commentary' ); ?> ></a>
		</div>
		<?php endif; ?>

	</div>
	<!-- /.container-fluid -->

</section>
