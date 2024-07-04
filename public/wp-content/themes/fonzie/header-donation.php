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
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
</head>

<?php
$_process = new donationProcess();
$_stage = $_process->process;
$_type = $_process->type;
?>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'charitypress' ); ?></a>

	<header id="masthead" class="site-header donation" role="banner">
		<div class="container-fluid">
			<div class="row">
				<div class="site-branding">
					<a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
						<?php get_template_part( 'template-parts/header-logo' ); ?>
					</a>
				</div>
				<div class="donation-process col-xs-12 col-lg-7">
					<div class="wrapper">
						<div class="process-step process-step--details<?php !$_stage == 'complete' ? print ' active' : ''; ?>"><?php _e('1. Donation Details', 'charitypress'); ?></div>
						<div class="process-step process-step--payment"><?php _e('2. Payment', 'charitypress'); ?></div>
						<div class="process-step process-step--success<?php $_stage == 'complete' ? print ' active' : ''; ?>"><?php _e('3. Thank you', 'charitypress'); ?></div>
					</div>
				</div>
			</div>
		</div>
	</header><!-- #masthead -->

	<div id="content" class="site-content">
