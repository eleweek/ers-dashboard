<?php
/**
 * Template name: Donations Landing Page
 */
get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<div class="container-fluid">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<div class="intro-block intro-block_left intro-block_donation">
					<div class="row">
						<div class="col-xs-12">
							<h1 class="page-title heading_pull-top"><?php the_title(); ?></h1>

							<?php if( get_field( 'page_intro_content' ) ) : ?>
							<div class="section-intro--text">
								<?php
									the_field( 'page_intro_content' );
								?>
							</div>
							<?php endif; ?>
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- /.intro-block -->
				<?php endwhile; endif; ?>
			</div>

				<?php
				if( !class_exists('acf') || !class_exists('CharityPressDonations\Plugin') ):
					?>
					<div class="row">
						<?php
						if( !class_exists('acf') ):
							echo '<div class="col-xs-12 alert alert-warning">'.__('This template requires ACF Pro plugin Enabled', 'charitypress').'</div>';
						endif;
						if( !class_exists('CharityPressDonations\Plugin') ):
							echo '<div class="col-xs-12 alert alert-warning">'.__('This template requires Charitypress Donations plugin enabled', 'charitypress').'</div>';
						endif;
						?>
					</div>
					<?php
				else:
					$donation_reg_url = get_rdd_process_page();
					$donation_single_url = get_rdd_process_page();
					?>

					<div class="container-fluid">

						<div class="row">

							<div class="col-xs-12">
								<div class="donation-types">
									<div class="donation-types__tab active" data-tab="donation-regular">
										<span><?php the_field('option_label_reg', 'option'); ?></span>
									</div>

									<div class="donation-types__tab" data-tab="donation-single">
										<span><?php the_field('option_label_single', 'option'); ?></span>
									</div>
								</div>
							</div>

						</div>

					</div>


					<div class="donation-type donation-regular active">

						<div class="donation-type__wrapper">
							<div class="container-fluid">

								<?php if( have_rows('set_amounts_reg', 'option') ): ?>

									<div class="row">
										<div class="col-xs-12">
											<h2 class="donation-type__title"><?php the_field('heading_reg', 'option'); ?></h2>
										</div>
									</div>

									<div class="row">
										<div class="col-xs-12">
											<div class="row">
												<?php while( have_rows('set_amounts_reg', 'option') ): the_row(); ?>
													<div class="col-sm-4 col-xs-12 donation-type__preset">
														<div class="donate-overlay">
															<a href="<?php echo $donation_reg_url; ?>?type=regular&amount=<?php the_sub_field('donation_value_reg', 'option'); ?>">
																<span class="donate-overlay__text">&pound;<?php the_sub_field('donation_value_reg', 'option'); ?></span>
																<?php
																if( get_sub_field('image_reg', 'option') ):
																	$id = get_sub_field('image_reg', 'option');
																	echo wp_get_attachment_image( $id, 'donation' );
																else:
//																	echo get_placeholder_img( 'mobile-full' );
																	?><img src="https://unsplash.it/514/306" /><?php
																endif;
																?>
															</a>
														</div>
														<?php if( get_sub_field('description_reg', 'option') ): ?>
															<p class="donation-type__description text-center"><?php echo get_sub_field('description_reg', 'option'); ?></p>
														<?php endif; ?>
														<a href="<?php echo $donation_reg_url; ?>?type=regular&amount=<?php the_sub_field('donation_value_reg', 'option'); ?>" class="btn btn-primary btn--full">
															<?php
															if( get_sub_field('button_text_reg', 'option') ):
																the_sub_field('button_text_reg', 'option');
															else:
																_e('Donate');
															endif;
															?>
														</a>
													</div>
												<?php endwhile; ?>
											</div>
										</div>
									</div>

								<?php endif; ?>

								<div class="row">
									<div class="col-xs-12">
										<div class="donation-amount">
											<div class="row">
												<div class="col-xs-12">
													<div class="donation-amount__label"><?php _e('Other amount', 'charitypress'); ?></div>
												</div>
											</div>
											<div class="row">
												<div class="col-xs-12">
													<form id="donation-amount__form-regular" action="<?php echo $donation_reg_url; ?>" method="get">
														<div class="donation-amount__inputField">
															<span>&pound;</span>
															<input type="number" name="amount" step="0.50" min="1" onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)" required />
														</div>
														<input type="hidden" name="type" value="regular" />
														<input type="submit" class="btn btn-secondary" value="Donate" />
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>

					</div>



					<div class="donation-type donation-single">

						<div class="donation-type__wrapper">
							<div class="container-fluid">

								<div class="row">
									<div class="col-sm-6 col-xs-12">
										<?php
										if( get_field('image_single', 'option') ):
											$id = get_field('image_single', 'option');
											echo wp_get_attachment_image( $id, 'mobile-full' );
										else:
//											echo get_placeholder_img( 'mobile-full' );
											?><img src="https://unsplash.it/514/306" /><?php
										endif;
										?>
									</div>
									<div class="col-sm-6 col-xs-12">
										<h2 class="donation-type__title"><?php the_field('heading_single', 'option'); ?></h2>
										<?php if( get_field('description_single', 'option') ): ?>
											<p class="donation-type__description"><?php echo get_field('description_single', 'option'); ?></p>
										<?php endif; ?>
										<?php
										if( get_field('button_text_single', 'option') ):
											$donate_btn_value = get_field('button_text_single', 'option');
										else:
											$donate_btn_value = 'Donate';
										endif;
										?>
										<div class="row">
											<div class="col-xs-12">
												<form id="donation-amount__form-single" action="<?php echo $donation_single_url; ?>" method="get">
													<div class="donation-amount__inputField">
														<span>&pound;</span>
														<input type="number" name="amount" step="0.50" min="1" onchange="(function(el){el.value=parseFloat(el.value).toFixed(2);})(this)" required />
													</div>
													<input type="hidden" name="type" value="single" />
													<input type="submit" class="btn btn-secondary btn--fluid" value="<?php echo $donate_btn_value; ?>" />
												</form>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>

					</div>

					<?php
				endif;
				?>

			</main>
	</div>

<?php get_footer();
