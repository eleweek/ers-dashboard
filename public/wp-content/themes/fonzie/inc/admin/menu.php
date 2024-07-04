<?php
/**
 * Customise left-hand admin menu.
 *
 * @package Fonzie
 */

/**
 * Re-name 'Posts' to 'News Posts'.
 */
function fonzie_change_post_menu_label() {
	global $menu, $submenu;

	$menu[ 5 ][ 0 ] = 'News Posts';
	$submenu[ 'edit.php' ][ 5 ][ 0 ] = 'News Posts';
	$submenu[ 'edit.php' ] [10 ][ 0 ] = 'Add News Post';
}
add_action( 'admin_menu', 'fonzie_change_post_menu_label' );

function fonzie_change_post_object_label() {
	global $wp_post_types;

	$labels = &$wp_post_types['post']->labels;
	$labels->name = 'News Posts';
	$labels->singular_name = 'News News Post';
	$labels->add_new = 'Add News Post';
	$labels->add_new_item = 'Add News Post';
	$labels->edit_item = 'Edit News Post';
	$labels->new_item = 'News Post';
	$labels->view_item = 'View News Post';
	$labels->search_items = 'Search News Posts';
	$labels->not_found = 'No News Posts found';
	$labels->not_found_in_trash = 'No News Posts found in Bin';
}
add_action( 'admin_menu', 'fonzie_change_post_object_label' );

/**
 * Shuffle 'Pages' to the top of the admin menu.
 */
function fonzie_change_menu_order( $menu_order ) {
	return array(
		'index.php',
		'edit.php?post_type=page',
		'edit.php',
		'upload.php'
	);
}
add_filter( 'custom_menu_order', '__return_true' );
add_filter( 'menu_order', 'fonzie_change_menu_order' );
