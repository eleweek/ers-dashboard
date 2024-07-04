<?php
// Register Custom Post Type
function rd_register_job_cpt() {

	$page = get_option('options_jobs_archive_page');
	$rewrite = ( $page ) ? get_cpt_rewrite_slug( $page ) : 'jobs';

	$labels = array(
		'name'                  => _x( 'Jobs', 'Post Type General Name', 'charitypress_fonzie' ),
		'singular_name'         => _x( 'Job', 'Post Type Singular Name', 'charitypress_fonzie' ),
		'menu_name'             => __( 'Jobs', 'charitypress_fonzie' ),
		'name_admin_bar'        => __( 'Jobs', 'charitypress_fonzie' ),
		'parent_item_colon'     => __( 'Parent Job:', 'charitypress_fonzie' ),
		'all_items'             => __( 'All Jobs', 'charitypress_fonzie' ),
		'add_new_item'          => __( 'Add New Job', 'charitypress_fonzie' ),
		'add_new'               => __( 'Add New', 'charitypress_fonzie' ),
		'new_item'              => __( 'New Job', 'charitypress_fonzie' ),
		'edit_item'             => __( 'Edit Job', 'charitypress_fonzie' ),
		'update_item'           => __( 'Update Job', 'charitypress_fonzie' ),
		'view_item'             => __( 'View Job', 'charitypress_fonzie' ),
		'search_items'          => __( 'Search Job', 'charitypress_fonzie' ),
		'not_found'             => __( 'Not found', 'charitypress_fonzie' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'charitypress_fonzie' ),
		'items_list'            => __( 'Jobs list', 'charitypress_fonzie' ),
		'items_list_navigation' => __( 'Jobs list navigation', 'charitypress_fonzie' ),
		'filter_items_list'     => __( 'Filter jobs list', 'charitypress_fonzie' ),
	);
	$args = array(
		'label'                 => __( 'Job', 'charitypress_fonzie' ),
		'description'           => __( 'List of vacancies', 'charitypress_fonzie' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'excerpt', 'author', 'thumbnail', 'revisions', ),
		'taxonomies'            => array(),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-id-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'rewrite'               => array( 'slug' => $rewrite )
	);
	register_post_type( 'jobs', $args );

}
add_action( 'init', 'rd_register_job_cpt', 1 );