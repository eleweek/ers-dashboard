<?php
if ( has_post_thumbnail() ):
	$image     = true;
	$_thumb_id = get_post_thumbnail_id();
	$_img_src  = wp_get_attachment_image_src( $_thumb_id, 'block-image' );
	$_img_alt  = get_post_meta( $_thumb_id, '_wp_attachment_image_alt', true );
endif;

$joinTitle = get_field('join_title');
$contactTitle = get_field('contact_title');
$fb = get_field('facebook_url');
$twitter = get_field('twitter_url');
$phone = get_field('phone_number');
$email = get_field('email_address');
?>

<div class="container-fluid">

	<?php icl_post_languages(); ?>

	<div class="national-hero">

		<?php if( $image ): ?>
			<div class="national-hero__image">
				<img src="<?php echo $_img_src[0]; ?>" alt="<?php echo $_img_alt; ?>">
			</div>
		<?php endif; ?>

		<div class="national-hero__content">

			<h1 class="national-hero__heading"><?php the_title(); ?></h1>

			<?php if( get_field( 'page_intro_content' ) ) : ?>
				<?php echo get_field( 'page_intro_content' ); ?>
			<?php endif; ?>

			<div class="national-hero__contact">

				<?php if(!empty($fb) || !empty($twitter)): ?>

					<div class="national-hero__online">
						<h2 class="national-hero__sub-heading"><?php echo $joinTitle ? $joinTitle : 'Join ERS Online'; ?></h2>

						<?php if(!empty($fb)): ?>

							<a href="<?php echo $fb; ?>" class="national-hero__contact-detail" target="_blank">
								<?php include( fonzie_svg_path( "facebook-square.svg" ) ); ?>
								<span>Facebook</span>
							</a>

						<?php endif; ?>

						<?php if(!empty($twitter)): ?>

							<a href="<?php echo $twitter; ?>" class="national-hero__contact-detail" target="_blank">
								<?php include( fonzie_svg_path( "twitter-square.svg" ) ); ?>
								<span>Twitter</span>
							</a>

						<?php endif; ?>
					</div>

				<?php endif; ?>

				<?php if(!empty($phone) || !empty($email)): ?>

					<div class="national-hero__contact-info">
						<h2 class="national-hero__sub-heading"><?php echo $contactTitle ? $contactTitle : 'Contact ERS'; ?></h2>

						<?php if(!empty($phone)): ?>

							<a href="tel:<?php echo $phone; ?>" class="national-hero__contact-detail">
								<?php include( fonzie_svg_path( "phone.svg" ) ); ?>
								<span><?php echo $phone; ?></span>
							</a>

						<?php endif; ?>

						<?php if(!empty($email)): ?>

							<a href="mailto:<?php echo $email; ?>" class="national-hero__contact-detail">
								<?php include( fonzie_svg_path( "envelope.svg" ) ); ?>
								<span><?php echo $email; ?></span>
							</a>

						<?php endif; ?>
					</div>

				<?php endif; ?>

			</div>

		</div>

	</div>

</div>
