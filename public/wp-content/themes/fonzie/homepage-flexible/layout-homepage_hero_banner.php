<?php
	$mobileImage = get_sub_field('homepage_hero_banner_mobile_image');
	$image = get_sub_field('homepage_hero_banner_image');
	$imageUrl = $image['url'];
	$mobileImageUrl = $mobileImage['url'];
	$backgroundPosition = getBackgroundImagePosition(get_sub_field('homepage_hero_banner_image_position'));

	$contentPosition = get_sub_field('homepage_hero_banner_content_position');
	$title = get_sub_field('homepage_hero_banner_content_title');
	$text = get_sub_field('homepage_hero_banner_content_text');
	$textStyle = get_sub_field('homepage_hero_banner_text_style');

	$linkLocation = get_sub_field('homepage_hero_banner_cta_button_link_location');
	$linkInternal = get_sub_field('homepage_hero_banner_cta_button_link_internal');
	$linkExternal = get_sub_field('homepage_hero_banner_cta_button_link_external');
	$linkText = get_sub_field( 'homepage_hero_banner_cta_button_link_text' );
?>

<?php if(!empty($mobileImageUrl)): ?>
	<style>
	@media (max-width: 767px) {
		.hero-banner {
			background-image: url('<?php echo $mobileImageUrl; ?>') !important;
		}
	}
	</style>
<?php endif; ?>




<div class="hero-banner hero-banner--<?php echo $contentPosition; ?> hero-banner--<?php echo $textStyle; ?>" style="background-image: url(<?php echo $imageUrl; ?>); background-repeat: no-repeat; background-size: cover; <?php echo $backgroundPosition; ?>">
	<div class="container-fluid">

		<div class="hero-banner__content">
			<div class="hero-banner__content-inner">
				<?php if ( $title ) : ?>
					<h2><?php echo $title; ?></h2>
				<?php endif; ?>

				<?php if ( $text ) : ?>
					<?php echo $text; ?>
				<?php endif; ?>

				<?php
					switch( $linkLocation ){
						case '1':
							$_url = $linkInternal;
							break;
						case '2':
							$_url = $linkExternal;
							break;
					}
				?>

				<?php if ( $linkText ) : ?>
					<a href="<?php echo $_url; ?>" class="btn btn_outlined btn_icon-right">
						<span><?php echo $linkText; ?></span><i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
					</a>
				<?php endif; ?>
			</div>
			<!-- /.hero-banner__content-inner -->
		</div>
		<!-- /.hero-banner__content -->

	</div>
	<!-- /.container-fluid -->
</div>
<!-- /.hero-banner -->
