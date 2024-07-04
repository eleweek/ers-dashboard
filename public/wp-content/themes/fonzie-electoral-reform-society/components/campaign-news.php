<?php
$news_cat = get_field('news_category');

$_args   = array(
	'posts_per_page' => 2,
	'post_type'      => 'post',
	'tax_query' => array(
		array(
			'taxonomy' => 'category',
			'field'    => 'term_id',
			'terms'    => $news_cat->term_id,
		),
	),
);

$_news = new WP_Query( $_args );

if ( $_news->have_posts() ): ?>

	<div class="campaign-info-block campaign-info-block--news bg-very-light-grey">

		<div class="container-fluid">

			<div class="campaign-info-block__header">
				<h4 class="campaign-info-block__title"><?php echo esc_html__( 'Latest News' ); ?></h4>

				<?php $category_url = add_query_arg( 'category_name', $news_cat->slug, get_permalink( get_option( 'page_for_posts' ) ) ); ?>
				<a href="<?php echo $category_url; ?>" class="btn btn_outlined campaign-info-block__btn"><?php echo esc_html__( 'See all news' ); ?></a>
			</div>

			<div class="block__row">

				<?php while ( $_news->have_posts() ): $_news->the_post(); ?>

					<div class="block__item block__item--double block__item--campaign-info new-block-item-container">

						<?php get_template_part( 'components/new', 'block-item' ); ?>

					</div>

				<?php
				endwhile;
				wp_reset_query(); ?>

			</div>

		</div>

	</div>

<?php endif; ?>
