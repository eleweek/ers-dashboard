<?php
// Register Custom Post Type
function rd_register_events_cpt() {

	$page = get_option('options_events_archive_page');
	$rewrite = ( $page ) ? get_cpt_rewrite_slug( $page ) : 'events';

	$labels = array(
		'name'                  => _x( 'Events', 'Post Type General Name', 'charitypress_fonzie' ),
		'singular_name'         => _x( 'Event', 'Post Type Singular Name', 'charitypress_fonzie' ),
		'menu_name'             => __( 'Events', 'charitypress_fonzie' ),
		'name_admin_bar'        => __( 'Events', 'charitypress_fonzie' ),
		'parent_item_colon'     => __( 'Parent Events:', 'charitypress_fonzie' ),
		'all_items'             => __( 'All Events', 'charitypress_fonzie' ),
		'add_new_item'          => __( 'Add New Event', 'charitypress_fonzie' ),
		'add_new'               => __( 'Add New', 'charitypress_fonzie' ),
		'new_item'              => __( 'New Event', 'charitypress_fonzie' ),
		'edit_item'             => __( 'Edit Event', 'charitypress_fonzie' ),
		'update_item'           => __( 'Update Event', 'charitypress_fonzie' ),
		'view_item'             => __( 'View Event', 'charitypress_fonzie' ),
		'search_items'          => __( 'Search Event', 'charitypress_fonzie' ),
		'not_found'             => __( 'Not found', 'charitypress_fonzie' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'charitypress_fonzie' ),
		'items_list'            => __( 'Events list', 'charitypress_fonzie' ),
		'items_list_navigation' => __( 'Events list navigation', 'charitypress_fonzie' ),
		'filter_items_list'     => __( 'Filter events list', 'charitypress_fonzie' ),
	);
	$args = array(
		'label'                 => __( 'Event', 'charitypress_fonzie' ),
		'description'           => __( 'Events Listings', 'charitypress_fonzie' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'excerpt', 'author', 'thumbnail', 'revisions', ),
		'taxonomies'            => array(),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-tickets-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'rewrite'               => array( 'slug' => $rewrite )
	);
	register_post_type( 'events', $args );

}
add_action( 'init', 'rd_register_events_cpt', 1 );