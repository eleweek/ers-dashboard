<?php
$background_position = getBackgroundImagePosition(get_field('header_image_position'));
$content_position = get_field('header_content_position');
$_image_url = wp_get_attachment_image_src( get_field('header_single_image'), 'block-hero-full' );
$_mobile_image_url = wp_get_attachment_image_src( get_field('header_single_image_mobile'), 'block-hero-full' );
$_text_style = get_field('header_content_text_style');
$_ctaText = get_field( 'header_cta_button_single_link_text' );
$_narrowBlock = get_field( 'header_image_narrow' );
$_narrowBlock ? $_narrowBlockClass = ' homepage-header-hero--narrow' : $_narrowBlockClass = '';
?>

<?php if(!empty($_mobile_image_url)): ?>
	<style>
	@media (max-width: 767px) {
		.homepage-header--main {
			background-image: url('<?php echo $_mobile_image_url[0]; ?>') !important;
		}
	}
	</style>
<?php endif; ?>

<div
	class="homepage-header homepage-header-hero homepage-header-hero--<?php echo $content_position; echo $_narrowBlockClass; ?> homepage-header-hero--<?php echo $_text_style; ?> homepage-header--main"
	style="background-image: url('<?php echo $_image_url[0] ; ?>'); background-repeat: no-repeat; background-size: cover; <?php echo $background_position; ?>">

	<div class="container-fluid">

		<div class="homepage-header-hero__content">

			<div class="homepage-header-hero__content-inner">

				<?php if( get_field('header_content_title') ): ?>
					<h1><?php the_field('header_content_title'); ?></h1>
				<?php endif; ?>
				<?php if( get_field('header_content_text') ): ?>
					<?php the_field('header_content_text'); ?>
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

				<?php if ( $_ctaText ) : ?>
					<a href="<?php echo $_url; ?>" class="btn btn_outlined btn_icon-right">
						<span><?php echo $_ctaText; ?></span><i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
					</a>
				<?php endif; ?>

			</div>

		</div>

	</div>

</div>
