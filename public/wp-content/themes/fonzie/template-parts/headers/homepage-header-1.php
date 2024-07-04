<?php $background_position = getBackgroundImagePosition(get_field('header_image_position')); ?>
<div class="homepage-header">
	<div class="homepage-header_left">
		<?php $_image_url = wp_get_attachment_image_src( get_field('header_single_image'), 'homepage-header_top--single' ); ?>
		<div class="homepage-header_left_image" style="background-image: url('<?php echo $_image_url[0] ; ?>'); <?php echo $background_position; ?>"></div>
	</div>
	<div class="homepage-header_right">
		<div class="homepage-header_right_content">
			<?php if( get_field('header_content_title') ): ?>
				<h2><?php the_field('header_content_title'); ?></h2>
			<?php endif; ?>
			<?php if( get_field('header_content_text') ): ?>
				<?php the_field('header_content_text'); ?>
			<?php endif; ?>

			<?php
			if( have_rows('header_multiple_cta_buttons') ):

				// loop through the rows of data
				while ( have_rows('header_multiple_cta_buttons') ) : the_row();

					switch( get_sub_field('header_cta_button_multiple_link_location') ){
						case '1':
							$_url = get_the_permalink( get_sub_field('header_cta_button_multiple_link_internal') );
							break;
						case '2':
							$_url = get_sub_field('header_cta_button_multiple_link_external');
							break;
					}

				?>
					<a href="<?php echo $_url; ?>" class="btn btn_outlined btn_icon-right">
						<span><?php the_sub_field('hedaer_cta_button_multiple_link_text'); ?></span>
						<i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
					</a>
				<?php

				endwhile;
			endif;
			?>
		</div>
	</div>
</div>