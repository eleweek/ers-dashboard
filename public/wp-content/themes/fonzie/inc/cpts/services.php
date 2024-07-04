<?php
// Register Custom Post Type
function rd_register_service_cpt() {

	$page = get_option('options_services_archive_page');
	$rewrite = ( $page ) ? get_cpt_rewrite_slug( $page ) : 'services';

	$labels = array(
		'name'                  => _x( 'Services', 'Post Type General Name', 'charitypress_fonzie' ),
		'singular_name'         => _x( 'Service', 'Post Type Singular Name', 'charitypress_fonzie' ),
		'menu_name'             => __( 'Services', 'charitypress_fonzie' ),
		'name_admin_bar'        => __( 'Services', 'charitypress_fonzie' ),
		'parent_item_colon'     => __( 'Parent Service:', 'charitypress_fonzie' ),
		'all_items'             => __( 'All Services', 'charitypress_fonzie' ),
		'add_new_item'          => __( 'Add New Service', 'charitypress_fonzie' ),
		'add_new'               => __( 'Add New', 'charitypress_fonzie' ),
		'new_item'              => __( 'New Service', 'charitypress_fonzie' ),
		'edit_item'             => __( 'Edit Service', 'charitypress_fonzie' ),
		'update_item'           => __( 'Update Service', 'charitypress_fonzie' ),
		'view_item'             => __( 'View Service', 'charitypress_fonzie' ),
		'search_items'          => __( 'Search Services', 'charitypress_fonzie' ),
		'not_found'             => __( 'Not found', 'charitypress_fonzie' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'charitypress_fonzie' ),
		'items_list'            => __( 'Services list', 'charitypress_fonzie' ),
		'items_list_navigation' => __( 'Services list navigation', 'charitypress_fonzie' ),
		'filter_items_list'     => __( 'Filter services list', 'charitypress_fonzie' ),
	);
	$args = array(
		'label'                 => __( 'Service', 'charitypress_fonzie' ),
		'description'           => __( 'Services', 'charitypress_fonzie' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'excerpt', 'author', 'thumbnail', 'revisions', ),
		'taxonomies'            => array(),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-awards',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'rewrite'               => array( 'slug' => $rewrite )
	);
	register_post_type( 'services', $args );

}
add_action( 'init', 'rd_register_service_cpt', 1 );