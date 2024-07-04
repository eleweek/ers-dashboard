<?php
$publications_cat = get_field('publications_category');

$_args   = array(
	'posts_per_page' => 2,
	'post_type'      => 'publications',
	'tax_query' => array(
		array(
			'taxonomy' => 'publications-category',
			'field'    => 'term_id',
			'terms'    => $publications_cat->term_id,
		),
	),
);

$_publications = new WP_Query( $_args );

if ( $_publications->have_posts() ): ?>

	<div class="campaign-info-block campaign-info-block--publications bg-very-light-grey">

		<div class="container-fluid">

			<div class="campaign-info-block__header">
				<h4 class="campaign-info-block__title"><?php echo esc_html__( 'Publications' ); ?></h4>

				<?php $category_url = add_query_arg( 'publications-category', $publications_cat->slug, get_permalink( get_field( 'publications_archive_page', 'options' ) ) ); ?>
				<a href="<?php echo $category_url; ?>" class="btn btn_outlined campaign-info-block__btn"><?php echo esc_html__( 'See all publications' ); ?></a>
			</div>

			<div class="block__row">

				<?php while ( $_publications->have_posts() ): $_publications->the_post(); ?>

					<div class="block__item block__item--double block__item--campaign-info new-block-item-container">

						<?php
						$term = first_term( $post );

						$image = false;
						if ( has_post_thumbnail() ):
							$image     = true;
							$_thumb_id = get_post_thumbnail_id();
							$_img_src  = wp_get_attachment_image_src( $_thumb_id, 'block-image--publication' );
							$_img_alt  = get_post_meta( $_thumb_id, '_wp_attachment_image_alt', true );
						endif;
						?>

						<div class="new-block-item new-block-item--publications element-link<?php if( $image ): echo ' new-block-item--image'; endif; ?>">

							<?php if( $image ): ?>
								<div class="new-block-item__image">
									<img src="<?php echo $_img_src[0]; ?>" alt="<?php echo $_img_alt; ?>">
								</div>
							<?php endif; ?>

							<div class="new-block-item__content">

								<h2 class="new-block-item__heading">
									<?php echo limit_words(get_the_title(), 15); ?>
								</h2>

								<?php the_excerpt(); ?>

								<a href="<?php the_permalink(); ?>" class="new-block-item__link"><?php echo esc_html__( 'Read more' ); ?> ></a>

							</div>

						</div>

					</div>

				<?php
				endwhile;
				wp_reset_query(); ?>

			</div>

		</div>

	</div>

<?php endif; ?>
