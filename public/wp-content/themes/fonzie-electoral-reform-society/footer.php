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

<footer id="colophon" class="ers-site-footer" role="contentinfo">
	<section class="ers-site-footer__main">
		<div class="container-fluid">
			<div class="ers-site-footer__newsletter">
				<h2>
					<?php echo get_global_option('newsletter_title'); ?>
				</h2>

				<a class="btn btn_secondary modal-btn" href="<?php echo get_global_option('newsletter_url'); ?>" target="_blank">
					Join our newsletter >
				</a>
			</div>

			<div class="ers-site-footer__content">
				<div class="ers-site-footer__about">
					<h2>
						<?php echo limit_words( get_global_option('footer_left_col_title'), 10 ); ?>
					</h2>

					<?php echo limit_words( get_global_option('footer_left_col_content'), 40 ); ?>
				</div>

				<div class="ers-site-footer__jobs">
					<h2>
						<?php echo get_global_option('footer_right_col_title'); ?>
					</h2>

					<?php echo get_global_option('footer_right_col_content'); ?>

					<?php if( get_global_option('footer_right_col_link_url') ) : ?>
					<p class="follow-link">
						<a href="<?php echo get_global_option('footer_right_col_link_url'); ?>"><?php echo get_global_option('footer_right_col_link_title'); ?> ></a>
					</p>
					<?php endif; ?>
				</div>

				<?php if ( get_global_option_have_rows( 'social_media_links' ) ) : ?>
				<div class="ers-site-footer__social">
					<h2>Join us online</h2>

					<ul class="link-list link-list--dark two-columns">
						<?php
							while ( get_global_option_have_rows( 'social_media_links' ) ) : the_row();

								switch( get_sub_field('footer_social_media_icon' ) ) {
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
				</div>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<section class="ers-site-footer__site-info">
		<div class="container-fluid">
			<div class="ers-site-footer__satellite">
				<nav role="navigation">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'footer-bottom',
							'menu_class' => 'link-list link-list--dark link-list--horizontal link-list--underline'
						) );
					?>
				</nav>

				<?php echo get_global_option('footer_bottom_copyright'); ?>
			</div>

			<p class="ers-site-footer__site-by">
				<?php _e('Website by', 'charitypress_fonzie'); ?> <a href="http://www.reasondigital.com/" rel="designer"><?php _e('Reason Digital', 'charitypress_fonzie');?></a>
			</p>
		</div>
	</section>
</footer>

<?php wp_footer(); ?>

</body>
</html>
