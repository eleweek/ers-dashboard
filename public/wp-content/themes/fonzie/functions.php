<?php
/**
 * Fonzie functions and definitions.
 *
 * Use get_stylesheet_directory_uri() to get the http path to your child theme,
 * to load styles, scripts and other resources.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package Fonzie
 */

/**
 * Implement the Custom Header feature.
 */
include_once( 'inc/charitypress/custom-header.php' );

/**
 * Custom template tags for this theme.
 */
include_once( 'inc/charitypress/template-tags.php' );

/**
 * Custom functions that act independently of the theme templates.
 */
include_once( 'inc/charitypress/extras.php' );

/**
 * Customizer additions.
 */
include_once( 'inc/charitypress/customizer.php' );

/**
 * Load Jetpack compatibility file.
 */
include_once( 'inc/charitypress/jetpack.php' );

/**
 * Security functions
 */
include_once( 'inc/charitypress/security.php' );

/**
 * Cleanup functions
 */
include_once( 'inc/charitypress/cleanup.php' );

/**
 * Setup functions
 */
include_once( 'inc/charitypress/setup.php' );

/**
 * Admin customisations: Dashboard
 */
include_once( 'inc/admin/dashboard.php' );

/**
 * Admin customisations: Menu
 */
include_once( 'inc/admin/menu.php' );

/**
 * Admin customisations: Field order
 */
include_once( 'inc/admin/fieldorder.php' );

/**
 * Admin customisations: Toolbar
 */
include_once( 'inc/admin/toolbar.php' );

/**
 * Admin customisations: Roles
 */
include_once( 'inc/admin/roles.php' );

/**
 * Admin customisations: Validation
 */
include_once( 'inc/admin/validation.php' );

/**
 * Dashboard functions
 */
include_once( 'inc/tgm/plugin-activation.php' );

/**
 * Dashboard functions
 */
include_once( 'inc/option_pages.php' );

/**
 * Section functions
 */
include_once( 'inc/acfload_field.php' );

/**
 * Register Custom Post Types
 */
include_once( 'inc/custom_post_types.php' );

/**
 * Register Taxonomies
 */
include_once( 'inc/taxonomies.php' );

/**
 * Donation Additional Functions
 */
include_once( 'inc/donations.php' );

/**
 * filters for pre_get_posts
 */
include_once( 'inc/pre_posts.php' );

/**
 * listing pagination
 */
include_once( 'inc/wp_bs_pagination.php' );

/**
 * listing pagination
 */
include_once( 'inc/filters.php' );

/**
 * Image sizes
 */
include_once( 'inc/image_size.php' );

/**
 * post list functions
 */
include_once( 'inc/listings.php' );

/**
 * gravity forms filters
 */
include_once( 'inc/gravity_forms.php' );

/**
 * Theme setup i.e. post type support
 */
include_once( 'inc/theme_setup.php' );

/**
 * Functions for repeaters
 */
include_once( 'inc/repeaters.php' );

/**
 * WP Customiser
 */
include_once( 'inc/customiser.php' );

/**
 * Breadcrumbs
 */
include_once( 'inc/breadcrumbs.php' );

/**
 * Enqueue scripts and styles.
 */
include_once( 'inc/enqueue.php' );

/**
 * Helpers
 */
include_once( 'inc/helpers.php' );

/**
 * Duplicate page within Wordpress
 */
include_once( 'inc/duplicate_page.php' );

/**
 * Responsive embeds
 */
include_once( 'inc/responsive_embeds.php' );

/**
 * Donation Extras
 */
include_once( 'inc/donation-extras.php' );

/**
 * WPML functions
 */
include_once( 'inc/wpml.php' );

/**
 * Copies ACF into content
 */
if ( function_exists( 'acf_add_local_field_group' ) ):
  rd_acf_to_post_content::addFieldKey( 'field_56c09a49d16c4' );
endif;
