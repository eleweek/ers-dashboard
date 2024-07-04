<?php
// Register Custom Post Type
function rd_register_briefings_cpt() {

	$page = get_option('options_briefings_archive_page');
	$rewrite = ( $page ) ? get_cpt_rewrite_slug( $page ) : 'briefings';

	$labels = array(
		'name'                  => _x( 'Briefings', 'Post Type General Name', 'charitypress_fonzie' ),
		'singular_name'         => _x( 'Briefing', 'Post Type Singular Name', 'charitypress_fonzie' ),
		'menu_name'             => __( 'Briefings', 'charitypress_fonzie' ),
		'name_admin_bar'        => __( 'Briefings', 'charitypress_fonzie' ),
		'parent_item_colon'     => __( 'Parent Briefing:', 'charitypress_fonzie' ),
		'all_items'             => __( 'All Briefings', 'charitypress_fonzie' ),
		'add_new_item'          => __( 'Add New Briefing', 'charitypress_fonzie' ),
		'add_new'               => __( 'Add New', 'charitypress_fonzie' ),
		'new_item'              => __( 'New Briefing', 'charitypress_fonzie' ),
		'edit_item'             => __( 'Edit Briefing', 'charitypress_fonzie' ),
		'update_item'           => __( 'Update Briefing', 'charitypress_fonzie' ),
		'view_item'             => __( 'View Briefing', 'charitypress_fonzie' ),
		'search_items'          => __( 'Search Briefings', 'charitypress_fonzie' ),
		'not_found'             => __( 'Not found', 'charitypress_fonzie' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'charitypress_fonzie' ),
		'items_list'            => __( 'Briefings list', 'charitypress_fonzie' ),
		'items_list_navigation' => __( 'Briefings list navigation', 'charitypress_fonzie' ),
		'filter_items_list'     => __( 'Filter briefings list', 'charitypress_fonzie' ),
	);
	$args = array(
		'label'                 => __( 'Briefing', 'charitypress_fonzie' ),
		'description'           => __( 'Briefings', 'charitypress_fonzie' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'excerpt', 'author', 'thumbnail', 'revisions' ),
		'taxonomies'            => array(),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 0,
		'menu_icon'             => 'dashicons-book-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'rewrite'               => array( 'slug' => $rewrite )
	);
	register_post_type( 'briefings', $args );

}
add_action( 'init', 'rd_register_briefings_cpt', 1 );
