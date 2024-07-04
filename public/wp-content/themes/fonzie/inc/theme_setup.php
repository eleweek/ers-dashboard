<?php

if( ! class_exists('acf') && !is_admin() ) {
	wp_die('Please activate the ACF plugin before continuing');
}

//remove post-formats
function remove_post_formats() {
	remove_theme_support( 'post-formats');
}
add_action( 'after_setup_theme', 'remove_post_formats', 11 );

function rd_remove_editor() {
	echo '<style>#postdivrich { display: none; };</style>';
}
add_action('admin_head', 'rd_remove_editor');

function add_excerpts_to_pages() {
	add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'add_excerpts_to_pages' );

function create_menus() {

	register_nav_menus( array(
			'primary'       => __( 'Primary Navigation' ),
			'footer-middle'    => __( 'Footer: Middle Column' ),
			'footer-right'    => __( 'Footer: Right Column' ),
			'footer-bottom'    => __( 'Footer: Bottom' ),
		)
	);

}
add_action( 'init' , 'create_menus' );
