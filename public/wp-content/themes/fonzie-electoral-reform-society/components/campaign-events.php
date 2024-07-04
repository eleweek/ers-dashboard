<?php
$events_cat = get_field('events_category');

$_args   = array(
	'posts_per_page' => 2,
	'post_type'      => 'events',
	'tax_query' => array(
		array(
			'taxonomy' => 'events-category',
			'field'    => 'term_id',
			'terms'    => $events_cat->term_id,
		),
	),
);

$_events = new WP_Query( $_args );

if ( $_events->have_posts() ): ?>

	<div class="campaign-info-block campaign-info-block--events">

		<div class="container-fluid">

			<div class="campaign-info-block__header">
				<h4 class="campaign-info-block__title"><?php echo esc_html__( 'Latest Events' ); ?></h4>

				<?php $category_url = add_query_arg( 'events-category', $events_cat->slug, get_permalink( get_field( 'events_archive_page', 'options' ) ) ); ?>
				<a href="<?php echo $category_url; ?>" class="btn btn_outlined campaign-info-block__btn"><?php echo esc_html__( 'See all events' ); ?></a>
			</div>

			<div class="block__row">

				<?php while ( $_events->have_posts() ): $_events->the_post(); ?>

					<div class="block__item block__item--double new-block-item-container new-block-item-container--reverse">

						<?php get_template_part( 'components/new', 'block-item' ); ?>

					</div>

				<?php
				endwhile;
				wp_reset_query(); ?>

			</div>

		</div>

	</div>

<?php endif; ?>
