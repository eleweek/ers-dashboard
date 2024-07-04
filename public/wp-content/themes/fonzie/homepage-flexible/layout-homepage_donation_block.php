<?php
if( class_exists('CharityPressDonations\Plugin') ) :

	$title       = get_sub_field( 'hdb_title' );
	$description = get_sub_field( 'hdb_description' );
	$images      = get_sub_field( 'hdb_images' );
	$buttons     = get_sub_field( 'hdb_buttons' );

?>

	<!-- donation block -->
	<section class="bg-lighter-grey padding-top-30 padding-bottom-30">

		<!-- .container-fluid -->
		<div class="container-fluid">
			<div class="homepage-donation-block">

				<div class="homepage-donation-block__images clearfix col-md-7 col-md-push-5 col-sm-12">
					<?php foreach ($images as $image) : ?>
						<?php if(isset($image['hdb_image']['sizes']['block-image'])): ?>
							<div class="homepage-donation-block__image">
								<img src="<?php echo $image['hdb_image']['sizes']['block-image'] ?>" alt="" class="">
							</div>
						<?php endif ?>
					<?php endforeach ?>
				</div>

				<div class="homepage-donation-block__content col-md-5 col-md-pull-7 col-sm-12">
					<div class="homepage-donation-block__content__text">
						<h3><i class="icon"><?php include( fonzie_svg_path( "heart.svg" ) ); ?></i> <?php echo $title ?>
						</h3>
						<p><?php echo $description ?></p>

						<?php foreach ($buttons as $index => $button ) : ?>

								<?php

								$classes = ($index === 1) ? 'btn btn_outlined' : 'btn';

								switch( $button['hdb_link_location'] ){
									case '1':
										$_url = get_the_permalink( $button['hdb_link_internal_url'] );
										break;
									case '2':
										$_url = $button['hdb_link_external_url'];
										break;
								}
								?>

								<a href="<?php echo $_url ?>" class="<?php echo $classes ?>">
									<span><?php echo $button['hdb_button_label'] ?></span>
								</a>

						<?php endforeach ?>
					</div>
				</div>

			</div>
		</div>
		<!-- /.container-fluid -->

	</section>

<?php endif; ?>
