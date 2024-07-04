<?php
/**
 * Add specific user roles.
 *
 * @package Fonzie
 */

function fonzie_create_site_admin_role() {
	$role = get_role( 'site_administrator' );

	if ( !$role ) {
		$administratorRole = get_role( 'administrator' );
		$capabilities = $administratorRole->capabilities;

		$removed_capabilities = [
			'activate_plugins',
			'edit_dashboard',
			'export',
			'import',
			'manage_options',
			'switch_themes',
			'install_themes',
			'delete_themes',
			'edit_themes',
			'install_plugins',
			'edit_plugins',
			'delete_plugins',
			'edit_user',
			'remove_users',
			'add_users',
			'promote_users'
		];

		foreach ( $removed_capabilities as $cap ) {
			unset( $capabilities[ $cap ] );
		}

		add_role(
			'site_administrator',
			'Site Administrator',
			$capabilities
		);

		$role = get_role( 'site_administrator' );
	}

	$role->add_cap( 'edit_theme_options' );

	return $role;
}
add_action( 'init', 'fonzie_create_site_admin_role' );
