<div class="homepage-header">
	<div class="homepage-header_top">
		<?php $_image_url_left = wp_get_attachment_image_src( get_field('header_image_third_left'), 'homepage-header_top--third' ); ?>
		<?php $_image_url_middle = wp_get_attachment_image_src( get_field('header_image_third_middle'), 'homepage-header_top--third' ); ?>
		<?php $_image_url_right = wp_get_attachment_image_src( get_field('header_image_third_right'), 'homepage-header_top--third' ); ?>
		<div class="homepage-header_top_image" style="background-image: url('<?php echo $_image_url_left[0] ; ?>')"></div>
		<div class="homepage-header_top_image" style="background-image: url('<?php echo $_image_url_middle[0] ; ?>')"></div>
		<div class="homepage-header_top_image" style="background-image: url('<?php echo $_image_url_right[0] ; ?>')"></div>
	</div>
	<div class="homepage-header_bottom">
		<div class="homepage-header_bottom_content homepage-header_bottom_content_left">
			<?php if( get_field('header_content_title') ): ?>
				<h2 class="larger"><?php the_field('header_content_title'); ?></h2>
			<?php endif; ?>
			<?php if( get_field('header_content_text') ): ?>
				<?php the_field('header_content_text'); ?>
			<?php endif; ?>
		</div>
		<div class="homepage-header_bottom_content homepage-header_bottom_content_right homepage-header_bottom_content_dark">
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
				<span><?php the_field( 'header_cta_button_single_link_text' ); ?></span><i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
			</a>
		</div>
	</div>
</div>
