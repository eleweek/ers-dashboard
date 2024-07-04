<?php $background_position = getBackgroundImagePosition(get_field('header_image_position')); ?>
<div class="homepage-header homepage-header--single-image-single-cta">
	<div class="homepage-header_left">
		<?php $_image_url = wp_get_attachment_image_src( get_field('header_single_image'), 'homepage-header_top--single' ); ?>
		<div class="homepage-header_left_image" style="background-image: url('<?php echo $_image_url[0] ; ?>'); <?php echo $background_position; ?>"></div>
	</div>
	<div class="homepage-header_right">
		<div class="homepage-header_right_content homepage-header_right_content_dark">
			<?php if( get_field('header_content_title') ): ?>
				<h2 class="h1"><?php echo get_field('header_content_title'); ?></h2>
			<?php endif; ?>
			<?php if( get_field('header_content_text') ): ?>
				<?php echo get_field('header_content_text'); ?>
			<?php endif; ?>

			<?php

			switch( get_field('header_cta_button_single_link_location') ){
				case '1':
					$_url = get_the_permalink( get_field('header_cta_button_single_link_internal') );
					break;
				case '2':
					$_url = get_field('header_cta_button_single_link_external');
					break;
			}

			?>
			<a href="<?php echo $_url; ?>" class="btn btn_outlined btn_icon-right">
				<?php echo get_field( 'header_cta_button_single_link_text' ); ?> >
			</a>

		</div>
	</div>
</div>
