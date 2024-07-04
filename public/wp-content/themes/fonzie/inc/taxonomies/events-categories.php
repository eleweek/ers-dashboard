<?php
// Register Category Taxonomy
function register_event_cat_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Categories', 'Taxonomy General Name', 'charitypress_fonzie' ),
		'singular_name'              => _x( 'Category', 'Taxonomy Singular Name', 'charitypress_fonzie' ),
		'menu_name'                  => __( 'Categories', 'charitypress_fonzie' ),
		'all_items'                  => __( 'All Categories', 'charitypress_fonzie' ),
		'parent_item'                => __( 'Parent Category', 'charitypress_fonzie' ),
		'parent_item_colon'          => __( 'Parent Category:', 'charitypress_fonzie' ),
		'new_item_name'              => __( 'New Category Name', 'charitypress_fonzie' ),
		'add_new_item'               => __( 'Add New Category', 'charitypress_fonzie' ),
		'edit_item'                  => __( 'Edit Category', 'charitypress_fonzie' ),
		'update_item'                => __( 'Update Category', 'charitypress_fonzie' ),
		'view_item'                  => __( 'View Category', 'charitypress_fonzie' ),
		'separate_items_with_commas' => __( 'Separate Category with commas', 'charitypress_fonzie' ),
		'add_or_remove_items'        => __( 'Add or remove Categories', 'charitypress_fonzie' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'charitypress_fonzie' ),
		'popular_items'              => __( 'Popular Categories', 'charitypress_fonzie' ),
		'search_items'               => __( 'Search Categories', 'charitypress_fonzie' ),
		'not_found'                  => __( 'Not Found', 'charitypress_fonzie' ),
		'items_list'                 => __( 'Categories list', 'charitypress_fonzie' ),
		'items_list_navigation'      => __( 'Categories list navigation', 'charitypress_fonzie' ),
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
	register_taxonomy( 'events-category', array( 'events' ), $args );

}
add_action( 'init', 'register_event_cat_taxonomy', 0 );
