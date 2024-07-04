<?php
$briefings_cat = get_field('briefings_category');

$_args   = array(
	'posts_per_page' => 2,
	'post_type'      => 'briefings',
	'tax_query' => array(
		array(
			'taxonomy' => 'briefings-category',
			'field'    => 'term_id',
			'terms'    => $briefings_cat->term_id,
		),
	),
);

$_briefings = new WP_Query( $_args );

if ( $_briefings->have_posts() ): ?>

	<div class="campaign-info-block campaign-info-block--briefings">

		<div class="container-fluid">

			<div class="campaign-info-block__header">
				<h4 class="campaign-info-block__title"><?php echo esc_html__( 'Briefings' ); ?></h4>

				<?php $category_url = add_query_arg( 'briefings-category', $briefings_cat->slug, get_permalink( get_field( 'briefings_archive_page', 'options' ) ) ); ?>
				<a href="<?php echo $category_url; ?>" class="btn btn_outlined campaign-info-block__btn"><?php echo esc_html__( 'See all briefings' ); ?></a>
			</div>

			<?php
			while ( $_briefings->have_posts() ): $_briefings->the_post();
				$term = first_term( $post ); ?>

				<div class="briefings-block">

					<div class="briefings-block__date">
						<div class="briefings-block__heading"><?php echo esc_html__( 'Date published' ); ?></div>
						<?php echo get_the_date( 'd/m/y'); ?>
					</div>

					<div class="briefings-block__main">
						<div class="briefings-block__heading"><?php echo esc_html__( 'Submission for' ); ?></div>
						<h3 class="briefings-block__title"><?php echo limit_words(get_the_title(), 9); ?></h3>
					</div>

					<div class="briefings-block__type">
						<div class="briefings-block__heading"><?php echo esc_html__( 'Type' ); ?></div>
						<div><?php echo $term; ?></div>
					</div>

					<div class="briefings-block__btn-container">
						<a href="<?php the_permalink(); ?>" class="btn btn_outlined briefings-block__btn"><?php echo esc_html__( 'Read More' ); ?></a>
					</div>

				</div>

			<?php
			endwhile;
			wp_reset_query(); ?>

		</div>

	</div>

<?php endif; ?>
