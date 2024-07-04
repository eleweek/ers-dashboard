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
	<style><?php echo file_get_contents( get_stylesheet_directory() . '/css/critical.css' ); ?></style>

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

	<header id="ers-masthead" class="ers-site-header" role="banner">
		<section class="ers-toolbar">
			<div class="container-fluid">
				<div class="ers-toolbar__upper">
					<nav role="navigation">
						<a class="ers-toolbar__tab" href="<?php echo get_global_option('ers_scotland_url'); ?>" aria-label="Read about Electoral Reform Society Scotland">ERS Scotland</a>
						<a class="ers-toolbar__tab" href="<?php echo get_global_option('ers_northern_ireland_url'); ?>" aria-label="Read about Electoral Reform Society Northen Ireland">ERS N.Ireland</a>
						<a class="ers-toolbar__tab" href="<?php echo get_global_option('ers_cymru_url'); ?>" aria-label="Read about Electoral Reform Society Cymru">ERS Cymru</a>
					</nav>

					<a class="ers-toolbar__search" href="#" aria-controls="toolbar-search">
						<?php include( fonzie_svg_path( "ers-search.svg" ) ); ?> I'm looking for...
					</a>
				</div>

				<div id="toolbar-search" class="ers-toolbar__lower" aria-hidden="true">
					<?php get_template_part( 'searchform-toolbar' ); ?>
				</div>
			</div>
		</section>

		<div class="container-fluid">
			<div class="ers-branding">
				<a href="<?php echo site_url(); ?>" class="ers-branding__logo">
					<?php include( fonzie_svg_path( "ers-logo.svg" ) ); ?>
				</a>

				<nav class="ers-branding__nav" role="navigation">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'primary'
						) );
					?>
				</nav>

				<a href="#" class="ers-branding__menu">
					<span>Menu</span>
				</a>
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
