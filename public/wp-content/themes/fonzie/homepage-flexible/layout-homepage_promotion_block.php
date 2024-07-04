<?php
	$image = get_sub_field('homepage_promotion_block_image');
	$imageUrl = $image['url'];
	$imageAlt = $image['alt'];
	$backgroundImage = get_sub_field('homepage_promotion_block_background_image');
	$backgroundImageUrl = $backgroundImage['url'];

	$heading = get_sub_field('homepage_promotion_block_heading');
	$subheading = get_sub_field('homepage_promotion_block_subheading');
	$text = get_sub_field('homepage_promotion_block_text');
	$textStyle = get_sub_field('homepage_promotion_block_text_style');

	$linkLocation = get_sub_field('homepage_promotion_block_cta_button_link_location');
	$linkInternal = get_sub_field('homepage_promotion_block_cta_button_link_internal');
	$linkExternal = get_sub_field('homepage_promotion_block_cta_button_link_external');
	$linkText = get_sub_field( 'homepage_promotion_block_cta_button_link_text' );

	switch( $linkLocation ){
		case '1':
			$linkUrl = $linkInternal;
			break;
		case '2':
			$linkUrl = $linkExternal;
			break;
	}

	$imageUrl ? $hasImage = ' promotion-block--hasImage' : $hasImage = '';
	$backgroundImageUrl ? $hasBackgroundImage = ' promotion-block--hasBackgroundImage' : $hasBackgroundImage = '';
?>


<div class="promotion-block promotion-block--<?php echo $textStyle; echo $hasImage; echo $hasBackgroundImage; ?>" style="background-image: url(<?php echo $backgroundImageUrl; ?>);">
	<div class="container-fluid">

		<div class="promotion-block__content">
			<div>
				<?php if ( $heading ) : ?>
					<h2><?php echo $heading; ?></h2>
				<?php endif; ?>

				<?php if ( $subheading ) : ?>
					<h3><?php echo $subheading; ?></h3>
				<?php endif; ?>

				<?php if ( $text ) : ?>
					<?php echo $text; ?>
				<?php endif; ?>

				<?php if ( $linkText ) : ?>
					<a href="<?php echo $linkUrl; ?>" class="btn btn_outlined btn_icon-right">
						<span><?php echo $linkText; ?></span><i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
					</a>
				<?php endif; ?>
			</div>

			<?php if ( $imageUrl ) : ?>
				<div>
					<img src="<?php echo $imageUrl; ?>" alt="<?php echo $imageAlt; ?>">
				</div>
			<?php endif; ?>
		</div>
		<!-- /.promotion-block__content -->

	</div>
	<!-- /.container-fluid -->
</div>
<!-- /.promotion-block -->
