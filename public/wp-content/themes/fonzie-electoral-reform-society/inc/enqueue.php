<?php
/**
 * Enqueue scripts and styles.
 *
 * @package Electoral Reform Society
 */

/**
 * Enqueue scripts and styles.
 */
function ers_scripts() {
	wp_enqueue_style( 'ers-crimson-font', 'https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700,700i' );
	wp_enqueue_style( 'ers-style', get_stylesheet_directory_uri() . '/css/style.css' );

	wp_enqueue_script( 'ers-scripts', get_stylesheet_directory_uri() . '/js/min/scripts.min.js', array( 'charitypress-navigation' ), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'ers_scripts' );

/**
 * Dequeue styles.
 */
function ers_dequeue_styles() {
	wp_dequeue_style( 'charitypress-theme-style' );
	wp_deregister_style( 'charitypress-theme-style' );
	wp_dequeue_style( 'open-sans' );
	wp_deregister_style( 'open-sans' );
	wp_dequeue_style( 'montserrat' );
	wp_deregister_style( 'montserrat' );
	wp_dequeue_style( 'merriweather' );
	wp_deregister_style( 'merriweather' );
}
add_action( 'wp_print_styles', 'ers_dequeue_styles' );
