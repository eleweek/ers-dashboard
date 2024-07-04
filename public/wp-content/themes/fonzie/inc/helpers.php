<?php

function font_family_body_class( $classes ) {
	$classes[] = 'open-sans';

	return $classes;
}

add_filter( 'body_class', 'font_family_body_class' );

function limit_words( $string, $word_limit ) {
	$words = explode( ' ', $string );
	if ( count( $words ) <= $word_limit ) {
		return $string;
	}

	$imploded = implode( ' ', array_slice( $words, 0, $word_limit ) );

	return $imploded . '...';
}

// Get page depth
function get_depth( $id = '', $depth = '', $i = 0 ) {
	global $wpdb;
	global $post;

	if ( $depth == '' ) {
		if ( is_page() ) {
			if ( $id == '' ) {
				$id = $post->ID;
			}
			$depth = $wpdb->get_var( "SELECT post_parent FROM $wpdb->posts WHERE ID = '" . $id . "'" );

			return get_depth( $id, $depth, $i );
		}
	} elseif ( $depth == "0" ) {
		return $i;
	} else {
		$depth = $wpdb->get_var( "SELECT post_parent FROM $wpdb->posts WHERE ID = '" . $depth . "'" );
		$i ++;

		return get_depth( $id, $depth, $i );
	}
}

/**
 * Return path to SVG image assets.
 *
 * @param string $filename
 */
function fonzie_svg_path( $filename ) {
	$path = locate_template('images/svg/' . $filename);

	return $path;
}


/**
 * Output the logo chosen by the user, or a default placeholder if that doesn't
 * exist.
 */
function fonzie_get_logo() {
	global $wpdb;

	$site_logo = get_option( 'site_logo' );

	if ( $site_logo ) {
		$attachment_id = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE guid='%s';", $site_logo ) );
		$attachment    = wp_get_attachment_image_src( $attachment_id[0], 'hla-189' );

		$image_url = $attachment[0];
	} else {
		$image_url = get_template_directory_uri() . '/images/jpg/test-logo.jpg';
	}

	return $image_url;
}

function menu_by_location( $location ) {
	if ( empty( $location ) ) {
		return false;
	}

	$locations = get_nav_menu_locations();
	if ( ! isset( $locations[ $location ] ) ) {
		return false;
	}

	$menu_obj = get_term( $locations[ $location ], 'nav_menu' );

	return $menu_obj;
}

/*
 * Hook for get_the_excerpt that pull in the page intro in the excerpt is missing.
 */
function excerpt_check_empty( $excerpt ) {

	if ( ! has_excerpt() && get_field( 'page_intro_content' ) ) :
		$excerpt = get_field( 'page_intro_content' );
	endif;

	return strip_tags( $excerpt );

}

add_filter( 'get_the_excerpt', 'excerpt_check_empty' );

if (!function_exists('getBackgroundImagePosition')) {

    function getBackgroundImagePosition( $soure_position ) {
        $position = 'center center';

        if( !empty( $soure_position !='' ) ) {
           $position = str_replace('_', ' ', $soure_position);
        }

        return 'background-position: ' . $position .';"';
    }
}
