<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CharityPress
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php do_action('rd/gtm-tag-head'); ?>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php do_action('rd/gtm-tag-body'); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'charitypress' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="container-fluid">
			<div class="site-header_container">
				<div class="site-branding">
					<a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
						<?php get_template_part( 'template-parts/header-logo' ); ?>
					</a>
				</div>
				<div class="tools float-right">
					<div class="site-header__search-form hidden-md-down">
						<?php get_search_form(); ?>
					</div>

					<nav class="btn-list">
						<ul>
							<?php if( get_field('button_active', 'option') ): ?>
								<?php

									switch( get_field('button_link_location', 'option') ){
										case '1':
											$_url = get_the_permalink( get_field('button_link_internal', 'option') );
											break;
										case '2':
											$_url = get_field('button_link_external', 'option');
											break;
									}


									$_btnClass = 'btn btn_outlined hidden-md-down';

									if( !class_exists('CharityPressDonations\Plugin') ) :
										if ( get_field ( 'button_is_donation', 'option' ) ) :
											$_btnClass = 'btn btn_icon-left donate-cta';
										endif;
									endif;


								?>
								<?php if( $_url != '' ): ?>
								<li>
									<a href="<?php echo $_url; ?>" class="<?php echo $_btnClass; ?>">

										<?php
											if( !class_exists('CharityPressDonations\Plugin') ) :
												if ( get_field ( 'button_is_donation', 'option' ) ) :
													?>

														<i class="icon"><?php include( fonzie_svg_path( "heart.svg" ) ); ?></i>

													<?php
												endif;
											endif;
										?>

										<span><?php echo get_field('button_text', 'option'); ?></span>
									</a>
								</li>
								<?php endif; ?>
							<?php endif; ?>
							<?php if( class_exists('CharityPressDonations\Plugin') ): ?>
							<li>
								<a href="<?php the_rdd_landing_page(); ?>" class="btn btn_icon-left donate-cta">
									<i class="icon"><?php include( fonzie_svg_path( "heart.svg" ) ); ?></i>
									<span><?php _e('Donate', 'charitypress_fonzie'); ?></span>
								</a>
							</li>
							<?php endif; ?>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</header><!-- #masthead -->

	<?php get_template_part( 'nav' ) ?>

	<?php
	if( !is_front_page() AND !is_page_template('templates/promotion-page.php') AND !is_404() ) {
		do_action('fonzie/breadcrumbs');
	}
	?>

	<div id="content" class="site-content">
