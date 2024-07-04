<?php
$title = get_sub_field('homepage_information_block_title');
$text = get_sub_field('homepage_information_block_text');
$buttons = 'homepage_information_block_buttons';
?>

<section class="homepage-information-block">

	<div class="container-fluid">

		<div class="row">

			<div class="col-lg-9">

				<h3 class="homepage-information-block__title"><?php echo $title; ?></h3>

				<div class="homepage-information-block__content">

					<?php echo $text; ?>

				</div>

			</div>

			<div class="col-lg-3">

				<?php if( have_rows($buttons) ): ?>

					<div class="homepage-information-block__buttons">

	    				<?php while ( have_rows($buttons) ) : the_row(); ?>

							<?php
							$linkLocation = get_sub_field('homepage_information_block_button_link_location');
							$linkInternal = get_sub_field('homepage_information_block_button_link_internal');
							$linkExternal = get_sub_field('homepage_information_block_button_link_external');
							$linkText = get_sub_field( 'homepage_information_block_button_text' );
							?>

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
								<a href="<?php echo $_url; ?>" class="btn btn-block">
									<?php echo $linkText; ?> >
								</a>
							<?php endif; ?>

	    				<?php endwhile; ?>

					</div>

				<?php endif; ?>

			</div>

		</div>

	</div>

</section>
