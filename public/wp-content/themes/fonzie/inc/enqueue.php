<?php

function fonzie_scripts() {

	if ( is_admin() ) {
		return;
	}

	$path = get_template_directory_uri();
	$googleMapsApiKey = get_field('general_google_maps_api_key', 'options');

	wp_enqueue_script( 'jquery', array(), '', true );
	wp_enqueue_script( 'tether', $path . '/js/min/tether.min.js' );
	wp_enqueue_script( 'bootstrap-v4', $path . '/js/min/bootstrap.min.js' );
	wp_enqueue_script( 'charitypress-navigation', $path . '/js/min/scripts.min.js', array(), '20120206', true );
	wp_enqueue_script( 'countto', $path . '/js/min/jquery.countTo.min.js', array( 'jquery' ) );
	wp_enqueue_script( 'slick', $path . '/js/min/slick.min.js', array( 'jquery' ) );
	wp_enqueue_script( 'modernizr', $path . '/js/min/modernizr.min.js' );
	wp_enqueue_script( 'object-fit-images', $path . '/js/min/ofi.min.js' );
	wp_enqueue_script( 'isotope', $path . '/js/min/isotope.js' );

	wp_enqueue_script( 'moment', $path . '/js/min/moment.js' );
	wp_enqueue_script( 'daterangepicker', $path . '/js/min/daterangepicker.js', [ 'moment' ] );

	if ( get_post_type() == 'events' || get_post_type() == 'services' ):
		wp_enqueue_script( 'mapsapi', '//maps.googleapis.com/maps/api/js?v=3.exp&key=' . $googleMapsApiKey );
	endif;

	$theme = ( get_option( 'colour_scheme' ) ) ? get_option( 'colour_scheme' ) : 'bright-blue-theme';
	wp_enqueue_style( 'open-sans', 'https://fonts.googleapis.com/css?family=Open+Sans:400,800italic,700italic,800,700,600italic,600,400italic,300,300italic' );
	wp_enqueue_style( 'montserrat', 'https://fonts.googleapis.com/css?family=Montserrat:400,700' );
	wp_enqueue_style( 'merriweather', 'https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic' );
	wp_enqueue_style( 'charitypress-theme-style', $path . '/css/themes/' . $theme . '.css' );


}

add_action( 'wp_enqueue_scripts', 'fonzie_scripts' );

function fonzie_enqueue_admin_scripts() {
	wp_enqueue_script( 'fonzie-admin', get_template_directory_uri() . '/js/admin/min/admin-scripts.min.js' );
}

add_action( 'admin_enqueue_scripts', 'fonzie_enqueue_admin_scripts' );

// customizer scripts
function fonzie_customizer_js() {
     wp_enqueue_script(
        'tcx-theme-customizer',
        get_template_directory_uri() . '/js/admin/customizer.js',
        null,
        null,
        true
    );
}
add_action( 'customize_preview_init', 'fonzie_customizer_js' );

// Google Maps API for ACF
function fonzie_acf_init($api) {
	$googleMapsApiKey = get_field('general_google_maps_api_key', 'options');
	$api['key'] = $googleMapsApiKey;
	return $api;
}
add_filter('acf/fields/google_map/api', 'fonzie_acf_init');
