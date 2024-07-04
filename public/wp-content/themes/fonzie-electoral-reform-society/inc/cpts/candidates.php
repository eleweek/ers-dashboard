<?php
// Register Custom Post Type
function rd_register_candidates_cpt() {

	$page = get_option('options_candidates_archive_page');
	$rewrite = ( $page ) ? get_cpt_rewrite_slug( $page ) : 'candidates';

	$labels = array(
		'name'                  => _x( 'Candidates', 'Post Type General Name', 'charitypress_fonzie' ),
		'singular_name'         => _x( 'Candidate', 'Post Type Singular Name', 'charitypress_fonzie' ),
		'menu_name'             => __( 'Candidates', 'charitypress_fonzie' ),
		'name_admin_bar'        => __( 'Candidates', 'charitypress_fonzie' ),
		'parent_item_colon'     => __( 'Parent Candidate:', 'charitypress_fonzie' ),
		'all_items'             => __( 'All Candidates', 'charitypress_fonzie' ),
		'add_new_item'          => __( 'Add New Candidate', 'charitypress_fonzie' ),
		'add_new'               => __( 'Add New', 'charitypress_fonzie' ),
		'new_item'              => __( 'New Candidate', 'charitypress_fonzie' ),
		'edit_item'             => __( 'Edit Candidate', 'charitypress_fonzie' ),
		'update_item'           => __( 'Update Candidate', 'charitypress_fonzie' ),
		'view_item'             => __( 'View Candidate', 'charitypress_fonzie' ),
		'search_items'          => __( 'Search Candidates', 'charitypress_fonzie' ),
		'not_found'             => __( 'Not found', 'charitypress_fonzie' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'charitypress_fonzie' ),
		'items_list'            => __( 'Candidates list', 'charitypress_fonzie' ),
		'items_list_navigation' => __( 'Candidates list navigation', 'charitypress_fonzie' ),
		'filter_items_list'     => __( 'Filter candidates list', 'charitypress_fonzie' ),
	);
	$args = array(
		'label'                 => __( 'Candidate', 'charitypress_fonzie' ),
		'description'           => __( 'Candidates', 'charitypress_fonzie' ),
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
	register_post_type( 'candidates', $args );

}
add_action( 'init', 'rd_register_candidates_cpt', 1 );
