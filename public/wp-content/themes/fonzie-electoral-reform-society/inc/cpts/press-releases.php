<?php
// Register Custom Post Type
function rd_register_pressreleases_cpt() {

	$page = get_option('options_pressreleases_archive_page');
	$rewrite = ( $page ) ? get_cpt_rewrite_slug( $page ) : 'pressreleases';

	$labels = array(
		'name'                  => _x( 'Press Releases', 'Post Type General Name', 'charitypress_fonzie' ),
		'singular_name'         => _x( 'Press Release', 'Post Type Singular Name', 'charitypress_fonzie' ),
		'menu_name'             => __( 'Press Releases', 'charitypress_fonzie' ),
		'name_admin_bar'        => __( 'Press Releases', 'charitypress_fonzie' ),
		'parent_item_colon'     => __( 'Parent Press Release:', 'charitypress_fonzie' ),
		'all_items'             => __( 'All Press Releases', 'charitypress_fonzie' ),
		'add_new_item'          => __( 'Add New Press Release', 'charitypress_fonzie' ),
		'add_new'               => __( 'Add New', 'charitypress_fonzie' ),
		'new_item'              => __( 'New Press Release', 'charitypress_fonzie' ),
		'edit_item'             => __( 'Edit Press Release', 'charitypress_fonzie' ),
		'update_item'           => __( 'Update Press Release', 'charitypress_fonzie' ),
		'view_item'             => __( 'View Press Release', 'charitypress_fonzie' ),
		'search_items'          => __( 'Search Press Releases', 'charitypress_fonzie' ),
		'not_found'             => __( 'Not found', 'charitypress_fonzie' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'charitypress_fonzie' ),
		'items_list'            => __( 'Press Releases list', 'charitypress_fonzie' ),
		'items_list_navigation' => __( 'Press Releases list navigation', 'charitypress_fonzie' ),
		'filter_items_list'     => __( 'Filter press releases list', 'charitypress_fonzie' ),
	);
	$args = array(
		'label'                 => __( 'Press Release', 'charitypress_fonzie' ),
		'description'           => __( 'Press Releases', 'charitypress_fonzie' ),
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
	register_post_type( 'pressreleases', $args );

}
add_action( 'init', 'rd_register_pressreleases_cpt', 1 );
