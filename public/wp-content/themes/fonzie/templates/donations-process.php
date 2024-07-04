<?php
/**
 * Template name: Donations Process Page
 */
get_header('donation');
?>

	<?php
	$_process = new donationProcess();
	$_stage = $_process->process;
	$_type = $_process->type;
	?>


	<div id="primary" class="content-area donation-process__wrap">
		<main id="main" class="site-main" role="main">

			<?php if ($_stage == 'complete'): ?>
				<div class="container-fluid">

					<div class="donation-process__end donation-process__end--complete">
						<div class="row">
							<div class="col-md-8 col-md-push-2">
								<h1 class="heading-tick">
									<i class="icon"><?php include( fonzie_svg_path( "donation-confirmation.svg" ) ); ?></i>
									<span><?php the_field('thank_you_title', 'option'); ?></span>
								</h1>
								<p><?php the_field('thank_you_message', 'option'); ?></p>
								<h4><?php the_field('share_title', 'option'); ?></h4>

								<div class="share-box">
									<?php $_message = get_field('share_message', 'option'); ?>
									<p class="share-box__message"><?php echo '"'.$_message.'"'; ?></p>
									<?php echo get_template_part('template-parts/social-share', 'donation'); ?>
								</div>
							</div>
						</div>
					</div>

				</div>
			<?php elseif($_stage == 'failed'): ?>

				<div class="container-fluid">

					<div class="donation-process__end donation-process__end--failed">
						<div class="row">
							<div class="col-md-8 col-md-push-2">
								<h1>Oops something's gone wrong</h1>
								<p>Your payment wasn't successful because of a technical error, you have not been charged for this transaction</p>

								<a class="btn" href="<?php the_field('failed_page_button_link', 'options'); ?>"><?php the_field('failed_page_button_text', 'options'); ?></a>
							</div>
						</div>
					</div><!-- /.donation-process__complete -->

				</div>

			<?php else: ?>

				<div class="container-fluid">
					<h1>Your <?php $_type == 'regular' ? print 'regular' : print 'one off'; ?> donation</h1>

					<div class="row">
						<div class="col-md-8">
							<div class="donation-process__block">
								<?php
									if( $_type == 'regular' ):
										do_action('charitypress_donation_form',
											'GoCardlessSubscription',
											'donation-form-regular',
											[]);
									else:
										do_action('charitypress_donation_form',
											'Stripe',
											'donation-form-single',
											[]);
									endif;
								?>
							</div>

							<div class="donation-process__secure">
								<?php if ( get_field('heading_secure', 'options') ) : ?>
									<h3><?php echo get_field('heading_secure', 'options');?></h3>
								<?php endif; ?>

								<?php if ( get_field('text1_secure', 'options') ) : ?>
									<p><?php echo get_field('text1_secure', 'options'); ?></p>
								<?php endif; ?>

								<?php if ( get_field('text2_secure', 'options') ) : ?>
									<p class="donation-process__secure-text"><?php get_field('icon_lock_secure', 'options') ? include( fonzie_svg_path('lock.svg') ) : ''; ?><?php echo get_field('text2_secure', 'options'); ?></p>
								<?php endif; ?>
							</div>
						</div>

						<div class="col-md-4 col-lg-3 col-lg-push-1 hidden-sm-down">
							<aside class="donation-process__extra">
								<?php echo wp_get_attachment_image(get_field('thank_you_sidebar_image', 'options')['ID'], 'donation-520-350'); ?>

								<h3><?php echo get_field('thank_you_sidebar_heading', 'options'); ?></h3>
								<p><?php echo get_field('thank_you_sidebar_text', 'options'); ?></p>
							</aside>
						</div>
					</div>

				</div><!-- /.container-fluid -->
			<?php endif; ?>

		</main>
	</div>


<?php get_footer(); ?>
