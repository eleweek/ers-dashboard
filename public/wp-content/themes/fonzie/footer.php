<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CharityPress
 */

?>

</div><!-- #content -->

<?php locate_template( 'template-parts/footer-newsletter.php', true ); ?>

<footer id="colophon" class="site-footer" role="contentinfo">

	<div class="site-footer__links">
		<div class="container-fluid">

			<div class="row">

				<div class="col-lg-4 site-footer__section">
					<h4><?php echo limit_words(get_field('footer_left_col_title', 'option'), 10); ?></h4>
					<?php echo limit_words(get_field('footer_left_col_content', 'option'), 40 ); ?>
				</div>

				<div class="col-lg-2 col-lg-offset-2 site-footer__section">

					<h4><?php echo get_field('footer_middle_col_heading', 'option'); ?></h4>

					<?php if ( have_rows( 'social_media_links', 'option' ) ): ?>

						<ul class="link-list link-list--dark two-columns">

							<?php while ( have_rows( 'social_media_links', 'option' ) ) : the_row(); ?>

								<?php
								switch( get_sub_field('footer_social_media_icon') ){
									case '1':
										$_icon = "facebook-square.svg";
										break;
									case '2':
										$_icon = "twitter.svg";
										break;
									case '3':
										$_icon = "linkedin.svg";
										break;
									case '4':
										$_icon = "instagram.svg";
										break;
									case '5':
										$_icon = "youtube.svg";
										break;
									case '6':
										$_icon = "vimeo.svg";
										break;
								}
								?>

								<li>
									<a href="<?php echo get_sub_field('link_location', 'option'); ?>" title="<?php echo get_sub_field('footer_social_media_link_title', 'option'); ?>">
										<i class="icon icon--social">
											<?php include( fonzie_svg_path( $_icon ) ); ?>
										</i><?php echo get_sub_field( 'footer_social_media_link_title', 'option' ); ?>
									</a>
								</li>

							<?php endwhile; ?>

						</ul>

					<?php endif;?>

				</div>

				<div class="col-xs-6 col-lg-2 site-footer__section">
					<?php
					$location = 'footer-middle';
					$menu_obj = menu_by_location( $location );
					?>
					<h4><?php echo  $menu_obj->name; ?></h4>

					<?php wp_nav_menu( array( 'theme_location' => $location, 'menu_class' => 'link-list link-list--dark' ) ); ?>

				</div>

				<div class="col-xs-6 col-sm-6 col-lg-2 site-footer__section">
					<?php
					$location = 'footer-right';
					$menu_obj = menu_by_location( $location );
					?>
					<h4><?php echo  $menu_obj->name; ?></h4>

					<?php wp_nav_menu( array( 'theme_location' => $location, 'menu_class' => 'link-list link-list--dark' ) ); ?>

				</div>

			</div>

		</div>
	</div>

	<?php
		if( have_rows('footer_logos', 'options') ):
			?>

				<div class="site-footer__logos">
					<div class="container-fluid">
						<div class="site-footer__logos-row clearfix">

							<?php
							    while ( have_rows('footer_logos', 'options') ) : the_row();
									$logosTitle = get_sub_field('footer_logos_title');
									?>

									<div class="site-footer__logos-col">
										<?php if ( $logosTitle ): ?>
											<h4><?php echo $logosTitle; ?></h4>
										<?php endif; ?>

										<?php
											if( have_rows('footer_logos_images', 'options') ):
												?>
													<div class="site-footer__logos-item-wrap clearfix">
														<?php
															while ( have_rows('footer_logos_images', 'options') ) : the_row();
																$logosImage = get_sub_field('footer_logos_image');
																$logosImageUrl = $logosImage['url'];
																$logosImageAlt = $logosImage['alt'];
																?>
																	<div class="site-footer__logos-item">
																		<?php if ( $logosImageUrl ): ?>
																			<img src="<?php echo $logosImageUrl; ?>" alt="<?php echo $logosImageAlt; ?>">
																		<?php endif; ?>
																	</div>
																	<!-- /.site-footer__logos-item -->
																<?php
															endwhile;
														?>
													</div>
													<!-- /.site-footer__logos-item-wrap -->
												<?php
											endif;
										?>
									</div>
									<!-- /.site-footer__logos-col -->

								<?php
							    endwhile;
							?>
						</div>
						<!-- /.site-footer__logos-row -->
					</div>
					<!-- /.container -->
				</div>
				<!-- /.site-footer__logos -->
			<?php
		endif;
	?>

	<div class="site-info">

		<div class="container-fluid">

			<div class="row">

				<div class="col-lg-8">
					<?php wp_nav_menu( array( 'theme_location' => 'footer-bottom', 'menu_class' => 'link-list link-list--dark link-list--horizontal link-list--underline' ) ); ?>

					<p class="site-info__copyright"><?php echo get_field('footer_bottom_copyright', 'option'); ?></p>
				</div>

				<div class="col-lg-4">
					<p class="site-info__site-by"><?php _e('Website by', 'charitypress_fonzie'); ?> <a href="http://www.reasondigital.com/" rel="designer"><?php _e('Reason Digital', 'charitypress_fonzie');?></a></p>
				</div>

			</div>
		</div>
	</div><!-- .site-info -->

</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
