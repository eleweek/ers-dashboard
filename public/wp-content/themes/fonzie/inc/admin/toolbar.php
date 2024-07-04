<?php
/**
 * Toolbar improvements.
 *
 * @package Fonzie
 */

/**
 * Force admin toolbar visibility.
 */
if ( is_user_logged_in() ) {
	add_filter( 'show_admin_bar', '__return_true' );
}

/**
 * Customise admin toolbar.
 */
function fonzie_customise_admin_bar( $wp_admin_bar ) {
	$allowed_nodes = [
		'site-name',
		'wp-logo',
		'customize',
		'edit',
		'top-secondary',
		'my-account',
		'user-actions',
		'user-info',
		'edit-profile',
		'logout',
		'my-sites',
		'my-sites-super-admin',
		'network-admin',
		'network-admin-d',
		'network-admin-s',
		'network-admin-u',
		'network-admin-t',
		'network-admin-p',
		'network-admin-o'
	];

	foreach ( $wp_admin_bar->get_nodes() as $key => $value ) {
		if ( !in_array( $key, $allowed_nodes ) ) {
			$wp_admin_bar->remove_node( $key );
		}
	}
}
add_action( 'admin_bar_menu', 'fonzie_customise_admin_bar', 999 );
