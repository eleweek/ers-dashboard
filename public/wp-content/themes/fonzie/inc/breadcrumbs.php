<?php

/**
 * Breadcrumbs handler.
 */
function fonzie_get_breadcrumb() {

	global $post;
	global $wp;

	if( is_front_page() )
		return;

	$events_archive = get_field('events_archive_page', 'options');
	$pub_archive = get_field('publications_archive_page', 'options');
	$briefings_archive = get_field('briefings_archive_page', 'options');
	$candidates_archive = get_field('candidates_archive_page', 'options');
	$pressreleases_archive = get_field('pressreleases_archive_page', 'options');

	$breadcrumbs = array(
		'<a href="' . esc_url( home_url( '/' ) ) . '">Home</a>'
	);

	$link = '<a href="%s">%s</a>';

	if ( is_404() ) {

		$breadcrumbs[] = '<span>404</span>';

	} elseif ( is_search() ) {

		$breadcrumbs[] = '<span>Search Results</span>';

	} elseif ( get_option( 'current_page_template' ) == 'better-search-template' ) {

		$breadcrumbs[] = '<span>Search Results</span>';

	} elseif ( isset( $wp->query_vars['regions'] ) ) {

		$root_neighbourhood_page = get_field( 'neighbourhood_root_page', 'option' );
		if ( null === $root_neighbourhood_page ) {
			$root_neighbourhood_page = get_page_by_title( 'your neighbourhood' );
		}
		$breadcrumbs += fonzie_get_parent_breadcrumbs( $root_neighbourhood_page->ID, $link );


		$breadcrumbs[] = sprintf( $link, get_permalink( $root_neighbourhood_page ), get_the_title( $root_neighbourhood_page ) );

		$term_slug     = $wp->query_vars['regions'];
		$term          = get_term_by( 'slug', $term_slug, 'regions' );
		$breadcrumbs[] = '<span>' . esc_html( $term->name ) . '</span>';

	} elseif ( get_post_type( $post ) === 'events' && !empty( $events_archive ) ) {

		$breadcrumbs += fonzie_get_parent_breadcrumbs( $events_archive, $link );

		if ( is_single() ) {
			$breadcrumbs[] = sprintf( $link, get_permalink( $events_archive ), get_the_title( $events_archive ) );
			$breadcrumbs[] = get_the_title();
		} else {
			$breadcrumbs[] = get_the_title( $events_archive );
		}

	} elseif ( get_post_type( $post ) === 'publications' && !empty( $pub_archive ) ) {

		$breadcrumbs += fonzie_get_parent_breadcrumbs( $pub_archive, $link );

		if ( is_single() ) {
			$breadcrumbs[] = sprintf( $link, get_permalink( $pub_archive ), get_the_title( $pub_archive ) );
			$breadcrumbs[] = get_the_title();
		} else {
			$breadcrumbs[] = get_the_title( $pub_archive );
		}

	} elseif ( get_post_type( $post ) === 'briefings' && !empty( $briefings_archive ) ) {

		$breadcrumbs += fonzie_get_parent_breadcrumbs( $briefings_archive, $link );

		if ( is_single() ) {
			$breadcrumbs[] = sprintf( $link, get_permalink( $briefings_archive ), get_the_title( $briefings_archive ) );
			$breadcrumbs[] = get_the_title();
		} else {
			$breadcrumbs[] = get_the_title( $briefings_archive );
		}

	} elseif ( get_post_type( $post ) === 'candidates' && !empty( $candidates_archive ) ) {

		$breadcrumbs += fonzie_get_parent_breadcrumbs( $candidates_archive, $link );

		if ( is_single() ) {
			$breadcrumbs[] = sprintf( $link, get_permalink( $candidates_archive ), get_the_title( $candidates_archive ) );
			$breadcrumbs[] = get_the_title();
		} else {
			$breadcrumbs[] = get_the_title( $candidates_archive );
		}

	} elseif ( get_post_type( $post ) === 'pressreleases' && !empty( $pressreleases_archive ) ) {

		$breadcrumbs += fonzie_get_parent_breadcrumbs( $pressreleases_archive, $link );

		if ( is_single() ) {
			$breadcrumbs[] = sprintf( $link, get_permalink( $pressreleases_archive ), get_the_title( $pressreleases_archive ) );
			$breadcrumbs[] = get_the_title();
		} else {
			$breadcrumbs[] = get_the_title( $pressreleases_archive );
		}

	} elseif ( is_archive() ) {
		$pto = get_post_type_object( get_post_type( $post ) );
		if ( null !== $pto ) {
			$breadcrumbs[] = '<span>' . esc_html( $pto->labels->name ) . '</span>';
		}
	} else {

		$basePostType = get_post_type( $post );
		$basePost     = $post;
		if ( is_singular( 'developments' ) ) {

			$pto = get_post_type_object( $basePostType );
			if ( null !== $pto ) {

				$breadcrumbs[] = '<span>' . esc_html( $pto->labels->name ) . '</span>';

			}

		} elseif ( is_singular( 'post' ) ) {
			$postArchive = get_option( 'page_for_posts' );
			$breadcrumbs += fonzie_get_parent_breadcrumbs( $postArchive, $link );
			$breadcrumbs[] = sprintf( $link, get_permalink( $postArchive ), get_the_title( $postArchive ) );

		} elseif( is_singular() && !is_singular( 'page' )) {
			$filter_name = 'fonzie/breadcrumbs/' . $basePostType;
			if (has_filter($filter_name)) {
				$breadcrumbs = apply_filters($filter_name, $breadcrumbs);
			} else {
				$pto = get_post_type_object( get_post_type( $post ) );
				if ( null !== $pto ) {
					if ($pto->public) {
						$breadcrumbs[] = '<a href="' . get_post_type_archive_link($basePostType) . '">' . esc_html( $pto->labels->name ) . '</a>';
					} else {
						$breadcrumbs[] = '<span>' . esc_html( $pto->labels->name ) . '</span>';
					}
				}
			}
		} elseif ( 'post' == $basePostType ) {

			$basePost = get_post( get_option( 'page_for_posts' ) );

		}

		$breadcrumbs += fonzie_get_parent_breadcrumbs( $basePost->ID, $link );

		$breadcrumbs[] = '<span>' . get_the_title( $basePost->ID ) . '</span>';
	}

	// get parent link (for mobile breadcrumb which just shows a link to the immediate parent)
	end($breadcrumbs);
	$back_link = prev($breadcrumbs);
	$back_link = preg_replace('/<a href="(.*)">/U', '<a href="$1">< ', $back_link);

	// build up the breadcrumbs markup
	$breadcrumbs_markup .= '<nav class="breadcrumbs" role="navigation">';
	$breadcrumbs_markup .= '<div class="container-fluid">';
	$breadcrumbs_markup .= implode( ' <span class="breadcrumbs__separator">></span> ', $breadcrumbs );
	$breadcrumbs_markup .= '</nav>';
	$breadcrumbs_markup .= '</div>';
	$breadcrumbs_markup .= '<nav class="breadcrumbs container-fluid breadcrumbs_mobile">' . $back_link . '</nav>';

	// print the breadcrumbs markup
	echo $breadcrumbs_markup;

}
add_action('fonzie/breadcrumbs', 'fonzie_get_breadcrumb');

function fonzie_get_parent_breadcrumbs( $post, $format ) {
	$parents     = get_post_ancestors( $post );
	$breadcrumbs = array();

	if ( count( $parents ) > 0 ) {

		$parents = array_reverse( $parents );

		foreach ( $parents as $parent_id ) {
			$breadcrumbs[ $parent_id ] = sprintf( $format, get_permalink( $parent_id ), get_the_title( $parent_id ) );
		}
	}

	return $breadcrumbs;

}
