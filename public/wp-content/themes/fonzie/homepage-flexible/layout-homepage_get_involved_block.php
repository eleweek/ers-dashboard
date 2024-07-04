<?php $_ctas = get_sub_field('homepage_gi_blocks'); ?>

<!-- get involved -->
<section class="padding-top-30 padding-bottom-30">

	<!-- .container-fluid -->
	<div class="container-fluid">

		<?php if( get_sub_field('homepage_gi_block_title') ): ?>
			<h2 class="text-center selected-pages__title"><?php the_sub_field('homepage_gi_block_title'); ?></h2>
		<?php endif; ?>

		<?php

		$_posts = array();
		$_blocks = get_sub_field( 'homepage_gi_blocks' );

		foreach( $_blocks as $_post ):
			$_posts[] = $_post['post'];
		endforeach;

		$_gi_query = new WP_Query(
			array(
				'post_type' => 'any',
				'orderby' => 'post__in',
				'post__in' => $_posts,
				'ignore_sticky_posts' => 1
			)
		);

		if( $_gi_query->have_posts() ):
			?>
			<div class="block__row">
				<?php
				$i = 0;
				while( $_gi_query->have_posts() ): $_gi_query->the_post();
					$i++;

					$_single_term = first_term( $post );
					$_feature_category = get_the_terms( $post->ID, 'feature-category' );
					$_feature_category = $_feature_category[0]->name;

					if ( get_post_thumbnail_id() ):

						$_img_string = '<img src="%s" alt="%s" %s/>';
						$_thumb_id   = get_post_thumbnail_id();

						$_classes = '';

						$_img_src  = wp_get_attachment_image_src( $_thumb_id, 'block-image' );
						$_img_alt  = get_post_meta( $_thumb_id, '_wp_attachment_image_alt', true );
						$_images = sprintf( $_img_string, $_img_src[0], $_img_alt, $_classes );

						//$_images = implode( '', $_images );

						$_has_img = true;

					else:

						$_has_img = false;
						$_images = '';

					endif;

					?>

					<div class="block__item block__item--third<?php echo ($i > 3)? ' hidden-md-up': ''; ?>">
						<a href="<?php the_permalink(); ?>" class="block__content<?php echo ($_has_img)? ' block__content--img_top block__content--hasimage' : ''; ?>">
							<?php if ( $_has_img ): ?>
								<div class="block__image block__image--single">
									<?php echo $_images; ?>
									<?php if( $_feature_category ): ?>
										<span class="block__tag"><?php _e( $_feature_category, 'charitypress_fonzie' ); ?></span>
									<?php elseif( $_single_term ): ?>
										<span class="block__tag"><?php _e( $_single_term, 'charitypress_fonzie' ); ?></span>
									<?php endif; ?>
								</div>
							<?php endif; ?>

							<div class="block__text">
								<h2><?php echo limit_words( get_the_title(), 8 ); ?></h2>
								<p><?php echo limit_words( get_the_excerpt(), 10 ); ?></p>
							</div><!-- /.blocks__content -->

							<?php if( $_feature_category && !$_has_img ): ?>
								<span class="block__tag"><?php _e( $_feature_category, 'charitypress_fonzie' ); ?></span>
							<?php elseif( $_single_term && !$_has_img ): ?>
								<span class="block__tag"><?php _e( $_single_term, 'charitypress_fonzie' ); ?></span>
							<?php endif; ?>
						</a>
					</div>
					<?php

				endwhile;
				wp_reset_query();
				?>
			</div>
			<?php
		endif;
		?>

	</div>
	<!-- /.container-fluid -->

</section>
<!-- /get involved -->
