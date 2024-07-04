<?php $_ctas = get_sub_field('homepage_cta_block'); ?>

<!-- how can we help you? -->
<section class="padding-top-60 padding-bottom-60">

	<!-- .container-fluid -->
	<div class="container-fluid">

		<?php if( get_sub_field('homepage_cta_block_title') ): ?>
			<h2 class="text-center selected-pages__title"><?php the_sub_field('homepage_cta_block_title'); ?></h2>
		<?php endif; ?>

		<div class="block__row">

			<?php
			foreach ($_ctas as &$cta) {
			    switch( $cta['homepage_cta_block_link_location'] ){
			    	case '1':
			    		$_url = get_the_permalink( $cta['homepage_cta_block_link_internal'] );
			    		break;
			    	case '2':
			    		$_url = $cta['homepage_cta_block_link_external'];
			    		break;
			    }
			?>
				<div class="block__item block__item--third block__item--generic block__item--cta-home">
					<a href="<?php echo $_url; ?>" class="block__content">
						<div class="block__image block__image--single">
							<?php $_image_url = wp_get_attachment_image_src( $cta['homepage_cta_block_image'], 'block-image' ); ?>
							<?php $_image_alt = get_post_meta( $cta['homepage_cta_block_image'], '_wp_attachment_image_alt', true); ?>
							<img src="<?php echo $_image_url[0]; ?>" alt="<?php echo $_image_alt; ?>">
						</div>

						<div class="block__text">
							<h2><?php echo limit_words( $cta['homepage_cta_block_title'], 11); ?></h2>
							<div class="block__link"><?php echo limit_words ( $cta['homepage_cta_block_link_text'], 10 ); ?> ></div>
						</div><!-- /.blocks__content -->

					</a>
				</div>
			<?php
			}
			?>
		</div>

	</div>
	<!-- /.container-fluid -->

</section>
<!-- /how can we help you? -->
