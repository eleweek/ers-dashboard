<?php
/**
 * Remove unnecessary WordPress functionality.
 *
 * @package CharityPress
 */

/**
 * Remove items from the WordPress admin menu:
 *   - Widgets
 *   - Discussions
 */
function charitypress_remove_menu_items() {
	$page = remove_submenu_page( 'themes.php', 'widgets.php' );
	//$page = remove_submenu_page( 'options-general.php', 'options-discussion.php' );
}

add_action( 'admin_menu', 'charitypress_remove_menu_items', 999 );

/**
 * Disable Comments functionality.
 */
function charitypress_disable_comments_post_types_support() {
	$post_types = get_post_types();

	foreach ( $post_types as $post_type ) {
		if ( post_type_supports( $post_type, 'comments' ) ) {
			remove_post_type_support( $post_type, 'comments' );

			remove_post_type_support( $post_type, 'trackbacks' );
		}
	}
}

//add_action( 'admin_init', 'charitypress_disable_comments_post_types_support' );

// Close comments on the front-end
function charitypress_disable_comments_status() {
	return false;
}

// add_filter( 'comments_open', 'charitypress_disable_comments_status', 20, 2 );
// add_filter( 'pings_open', 'charitypress_disable_comments_status', 20, 2 );

// Hide existing comments
function charitypress_disable_comments_hide_existing_comments( $comments ) {
	$comments = array();

	return $comments;
}

//add_filter( 'comments_array', 'charitypress_disable_comments_hide_existing_comments', 10, 2 );

// Remove comments page in menu
function charitypress_disable_comments_admin_menu() {
	remove_menu_page( 'edit-comments.php' );
}

//add_action( 'admin_menu', 'charitypress_disable_comments_admin_menu' );

// Redirect any user trying to access comments page
function charitypress_disable_comments_admin_menu_redirect() {
	global $pagenow;

	if ( $pagenow === 'edit-comments.php' ) {
		wp_redirect( admin_url() );

		exit;
	}
}

//add_action( 'admin_init', 'charitypress_disable_comments_admin_menu_redirect' );

// Remove comments metabox from dashboard
function charitypress_disable_comments_dashboard() {
	remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
}

//add_action( 'admin_init', 'charitypress_disable_comments_dashboard' );

// Remove comments links from admin bar
function charitypress_disable_comments_admin_bar() {
	if ( is_admin_bar_showing() ) {
		remove_action( 'admin_bar_menu', 'wp_admin_bar_comments_menu', 60 );
	}
}

//add_action( 'init', 'charitypress_disable_comments_admin_bar' );

/**
 * Remove Comments node from Admin Bar.
 */
function charitypress_remove_comments_node( $wp_admin_bar ) {
	$wp_admin_bar->remove_node( 'comments' );
}

//add_action( 'admin_bar_menu', 'charitypress_remove_comments_node', 999 );

/**
 * Google Chrome display fix for admin sidebar.
 */
function charitypress_chromefix_inline_css() {
	wp_add_inline_style( 'wp-admin', '#adminmenu { transform: translateZ(0); }' );
}

add_action( 'admin_enqueue_scripts', 'charitypress_chromefix_inline_css' );


/**
 * Remove table from TinyMCE Advanced
 */
function charitypress_update_tinymce_buttons( $toolbars ) {
	foreach ($toolbars as $key => $toolbar) {
		$toolbar_settings = explode(',', $toolbar);
		if( ($toolbar_key = array_search('table', $toolbar_settings, true)) !== false ) {
			unset($toolbar_settings[$toolbar_key]);
			$toolbars[$key] = implode(',', $toolbar_settings);
		}
	}
	return $toolbars;
}

function charitypress_update_tinymce_buttons_init() {
	add_filter( 'pre_update_option_tadv_settings', 'charitypress_update_tinymce_buttons', 10);
}
add_action( 'admin_init', 'charitypress_update_tinymce_buttons_init' );

/**
 * Disable Emoji functionality.
 */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
