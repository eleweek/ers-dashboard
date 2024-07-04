<?php
/**
 * Theme intialisation and setup.
 *
 * @package Electoral Reform Society
 */

/**
 * Remove redundant body classes.
 */
function ers_body_class( $wp_classes, $extra_classes ) {
	$blacklist = [ 'open-sans' ];

	foreach ( $wp_classes as $key => $value ) {
		if ( in_array( $value, $blacklist ) ) {
			unset( $wp_classes[ $key ] );
		}
	}

	return $wp_classes;
}
add_filter( 'body_class', 'ers_body_class', 20, 2 );
