<?php
// Register Custom Post Type
function rd_register_publications_cpt() {

	$page = get_option('options_publications_archive_page');
	$rewrite = ( $page ) ? get_cpt_rewrite_slug( $page ) : 'publications';

	$labels = array(
		'name'                  => _x( 'Publications', 'Post Type General Name', 'charitypress_fonzie' ),
		'singular_name'         => _x( 'Publication', 'Post Type Singular Name', 'charitypress_fonzie' ),
		'menu_name'             => __( 'Publications', 'charitypress_fonzie' ),
		'name_admin_bar'        => __( 'Publications', 'charitypress_fonzie' ),
		'parent_item_colon'     => __( 'Parent Publication:', 'charitypress_fonzie' ),
		'all_items'             => __( 'All Publications', 'charitypress_fonzie' ),
		'add_new_item'          => __( 'Add New Publication', 'charitypress_fonzie' ),
		'add_new'               => __( 'Add New', 'charitypress_fonzie' ),
		'new_item'              => __( 'New Publication', 'charitypress_fonzie' ),
		'edit_item'             => __( 'Edit Publication', 'charitypress_fonzie' ),
		'update_item'           => __( 'Update Publication', 'charitypress_fonzie' ),
		'view_item'             => __( 'View Publication', 'charitypress_fonzie' ),
		'search_items'          => __( 'Search Publications', 'charitypress_fonzie' ),
		'not_found'             => __( 'Not found', 'charitypress_fonzie' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'charitypress_fonzie' ),
		'items_list'            => __( 'Publications list', 'charitypress_fonzie' ),
		'items_list_navigation' => __( 'Publications list navigation', 'charitypress_fonzie' ),
		'filter_items_list'     => __( 'Filter publications list', 'charitypress_fonzie' ),
	);
	$args = array(
		'label'                 => __( 'Publication', 'charitypress_fonzie' ),
		'description'           => __( 'Publications', 'charitypress_fonzie' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'excerpt', 'author', 'thumbnail', 'revisions' ),
		'taxonomies'            => array(),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 0,
		'menu_icon'             => 'dashicons-book',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'rewrite'               => array( 'slug' => $rewrite )
	);
	register_post_type( 'publications', $args );

}
add_action( 'init', 'rd_register_publications_cpt', 1 );
