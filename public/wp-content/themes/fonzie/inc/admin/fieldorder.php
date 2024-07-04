<?php
/**
 * Default field order customisations.
 *
 * @package Fonzie
 */

/**
 * Re-order Page meta boxes.
 */
function fonzie_page_image_metabox() {
	/* Remove meta boxes */
	remove_meta_box( 'postimagediv', 'page', 'side' );
	remove_meta_box( 'pageparentdiv', 'page', 'side' );

	/* Add meta boxes */
	add_meta_box( 'postimagediv', __( 'Featured Image' ), 'post_thumbnail_meta_box', 'page', 'side', 'low' );
	add_meta_box( 'pageparentdiv', __( 'Page Attributes' ), 'page_attributes_meta_box', 'page', 'side', 'low' );
}
add_action( 'do_meta_boxes', 'fonzie_page_image_metabox' );

/**
 * Re-order Post meta boxes.
 */
function fonzie_post_image_metabox() {
	/* Remove meta boxes */
	remove_meta_box( 'postimagediv', 'post', 'side' );
	remove_meta_box( 'categorydiv', 'post', 'side' );
	remove_meta_box( 'tagsdiv-post_tag', 'post', 'side' );

	/* Add meta boxes */
	add_meta_box( 'postimagediv', __( 'Featured Image' ), 'post_thumbnail_meta_box', 'post', 'side', 'low' );
	add_meta_box( 'categorydiv', __( 'Categories' ), 'post_categories_meta_box', 'post', 'side', 'low' );
	add_meta_box( 'tagsdiv-post_tag', __( 'Tags' ), 'post_tags_meta_box', 'post', 'side', 'low' );
}
add_action( 'do_meta_boxes', 'fonzie_post_image_metabox' );

/**
 * Re-order Jobs meta boxes.
 */
function fonzie_jobs_image_metabox() {
	/* Remove meta boxes */
	remove_meta_box( 'postimagediv', 'jobs', 'side' );
	remove_meta_box( 'jobs-categorydiv', 'jobs', 'side' );

	/* Add meta boxes */
	add_meta_box( 'postimagediv', __( 'Featured Image' ), 'post_thumbnail_meta_box', 'jobs', 'side', 'low' );
	add_meta_box( 'jobs-categorydiv', __( 'Categories' ), 'post_categories_meta_box', 'jobs', 'side', 'low', array( 'taxonomy' => 'jobs-category' ) );
}
add_action( 'do_meta_boxes', 'fonzie_jobs_image_metabox' );

/**
 * Re-order Events meta boxes.
 */
function fonzie_events_image_metabox() {
	/* Remove meta boxes */
	remove_meta_box( 'postimagediv', 'events', 'side' );
	remove_meta_box( 'events-categorydiv', 'events', 'side' );

	/* Add meta boxes */
	add_meta_box( 'postimagediv', __( 'Featured Image' ), 'post_thumbnail_meta_box', 'events', 'side', 'low' );
	add_meta_box( 'events-categorydiv', __( 'Categories' ), 'post_categories_meta_box', 'events', 'side', 'low', array( 'taxonomy' => 'events-category' ) );
}
add_action( 'do_meta_boxes', 'fonzie_events_image_metabox' );

/**
 * Re-order Services meta boxes.
 */
function fonzie_services_image_metabox() {
	/* Remove meta boxes */
	remove_meta_box( 'postimagediv', 'services', 'side' );
	remove_meta_box( 'services-categorydiv', 'services', 'side' );

	/* Add meta boxes */
	add_meta_box( 'postimagediv', __( 'Featured Image' ), 'post_thumbnail_meta_box', 'services', 'side', 'low' );
	add_meta_box( 'services-categorydiv', __( 'Categories' ), 'post_categories_meta_box', 'services', 'side', 'low', array( 'taxonomy' => 'services-category' ) );
}
add_action( 'do_meta_boxes', 'fonzie_services_image_metabox' );

/**
 * Close Yoast SEO meta box by default.
 */
function fonzie_closed_meta_boxes( $closed ) {
	$closed[] = 'wpseo_meta';

	return $closed;
}
add_filter( 'get_user_option_closedpostboxes_post', 'fonzie_closed_meta_boxes' );
add_filter( 'get_user_option_closedpostboxes_page', 'fonzie_closed_meta_boxes' );
add_filter( 'get_user_option_closedpostboxes_events', 'fonzie_closed_meta_boxes' );
add_filter( 'get_user_option_closedpostboxes_jobs', 'fonzie_closed_meta_boxes' );
add_filter( 'get_user_option_closedpostboxes_services', 'fonzie_closed_meta_boxes' );
add_filter( 'get_user_option_closedpostboxes_cp-campaigns', 'fonzie_closed_meta_boxes' );

/**
 * Remove redundant menu items.
 */
function fonzie_remove_admin_menu_items() {
	global $submenu;

	unset( $submenu[ 'themes.php' ][ 15 ] ); // Header
	unset( $submenu[ 'themes.php' ][ 20 ] ); // Background
}
add_action( 'admin_menu', 'fonzie_remove_admin_menu_items' );
