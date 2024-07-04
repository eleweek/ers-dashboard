<?php
// Register Nation Taxonomy
function register_nations_cat_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Nations', 'Taxonomy General Name', 'charitypress_fonzie' ),
		'singular_name'              => _x( 'Nation', 'Taxonomy Singular Name', 'charitypress_fonzie' ),
		'menu_name'                  => __( 'Nations', 'charitypress_fonzie' ),
		'all_items'                  => __( 'All Nations', 'charitypress_fonzie' ),
		'parent_item'                => __( 'Parent Nation', 'charitypress_fonzie' ),
		'parent_item_colon'          => __( 'Parent Nation:', 'charitypress_fonzie' ),
		'new_item_name'              => __( 'New Nation Name', 'charitypress_fonzie' ),
		'add_new_item'               => __( 'Add New Nation', 'charitypress_fonzie' ),
		'edit_item'                  => __( 'Edit Nation', 'charitypress_fonzie' ),
		'update_item'                => __( 'Update Nation', 'charitypress_fonzie' ),
		'view_item'                  => __( 'View Nation', 'charitypress_fonzie' ),
		'separate_items_with_commas' => __( 'Separate Nation with commas', 'charitypress_fonzie' ),
		'add_or_remove_items'        => __( 'Add or remove Nations', 'charitypress_fonzie' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'charitypress_fonzie' ),
		'popular_items'              => __( 'Popular Nations', 'charitypress_fonzie' ),
		'search_items'               => __( 'Search Nations', 'charitypress_fonzie' ),
		'not_found'                  => __( 'Not Found', 'charitypress_fonzie' ),
		'items_list'                 => __( 'Nations list', 'charitypress_fonzie' ),
		'items_list_navigation'      => __( 'Nations list navigation', 'charitypress_fonzie' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => false,
		'show_tagcloud'              => false,
	);
	register_taxonomy( 'nations-category', array( 'post', 'publications', 'briefings' ), $args );

}
add_action( 'init', 'register_nations_cat_taxonomy', 0 );
