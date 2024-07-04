<?php

// 12 posts per page for archive pages with the listing-grid style
function listing_grid_ppp( $query ) {
	if ( is_admin() ):
		return $query;
	endif;

	if ( $query->is_singular() ):
		return $query;
	endif;

	if ( ! isset( $query->query_vars['post_type'] ) ) :
		return $query;
	endif;

	if ( $query->query_vars['post_type'] == 'jobs'
	     || $query->query_vars['post_type'] == 'services'
	     || $query->query_vars['post_type'] == 'action'
	) :

		$query->set( 'posts_per_page', 12 );

	endif;

	return $query;

}

add_action( 'pre_get_posts', 'listing_grid_ppp' );

function events_order_date( $query ) {
	if ( is_admin() ):
		return $query;
	endif;

	if ( $query->is_singular() ):
		return $query;
	endif;

	if ( isset( $query->query_vars['post_type'] ) && $query->query_vars['post_type'] == 'events' ) :

		$meta_query = $query->get( 'meta_query' );

		$time = new DateTime( '00:00:00' );

		if ( gettype( $meta_query ) !== 'array' ) {
			$meta_query = null;
		}
		$meta_query[] = array(
			'relation' => 'OR',
			array(
				'key'     => 'start_date',
				'value'   => $time->format( 'Ymd' ),
				'compare' => '>=',
				'type'    => 'date'
			),
			array(
				'key'     => 'end_date',
				'value'   => $time->format( 'Ymd' ),
				'compare' => '>=',
				'type'    => 'date'
			)
		);

		$query->set( 'meta_key', 'start_date' );
		$query->set( 'orderby', 'meta_value' );
		$query->set( 'order', 'ASC' );
		$query->set( 'meta_query', $meta_query );

	endif;

	return $query;

}

add_action( 'pre_get_posts', 'events_order_date' );

/**
 * @param WP_Query $query
 *
 * @return mixed
 */
function search_filter( $query ) {

	if ( is_admin() ):
		return $query;
	endif;

	if ( $query->is_singular() ):
		return $query;
	endif;

	if ( $query->is_search ) :

		/** @var WPDB $wpdb */
		global $wpdb;

		$meta_query = $query->get( 'meta_query' );
		$time       = new DateTime( '00:00:00' );

		$_my_meta_query = array(
			'relation' => 'OR',
			array(
				'key'     => 'start_date',
				'value'   => $time->format( 'Ymd' ),
				'compare' => '>=',
				'type'    => 'date'
			),
			array(
				'key'     => 'end_date',
				'value'   => $time->format( 'Ymd' ),
				'compare' => '>=',
				'type'    => 'date'
			)
		);

		if ( gettype( $meta_query ) !== 'array' ) {
			$meta_query = null;
		}
		$meta_query[] = $_my_meta_query;

		global $bsearch_settings;
		if ( $bsearch_settings && ! $bsearch_settings['seamless'] ) {
			$query->set( 'meta_query', $meta_query );

			return;
		}

		$term           = $query->query_vars['s'];
		$transient_name = 'rd_fonzie_search_' . esc_sql( $term );
		if ( ! $bsearch_meta = get_transient( $transient_name ) ) {
			$bsearch_meta = get_meta_sql( $_my_meta_query, 'post', $wpdb->posts, 'ID' );
			set_transient( $transient_name, $bsearch_meta );
		}

		add_filter( 'bsearch_posts_join', function ( $join ) use ( $bsearch_meta ) {
			return $join . $bsearch_meta['join'];
		} );
		add_filter( 'bsearch_posts_where', function ( $where ) use ( $bsearch_meta ) {
			return $where . $bsearch_meta['where'];
		} );

	endif;

	return $query;
}

add_action( 'pre_get_posts', 'search_filter' );


/**
 * Create date filter for posts older then current date
 */
function fonzie_date_range( $where = '' ) {
	$startDate = filter_input( INPUT_GET, 'startDate', FILTER_SANITIZE_SPECIAL_CHARS );
	$endDate   = filter_input( INPUT_GET, 'endDate', FILTER_SANITIZE_SPECIAL_CHARS );

	if ( isset( $startDate ) && isset( $endDate ) ) {
		$where .= " AND post_date >= '" . date( 'Y/m/d', strtotime( $startDate ) ) . "'";
		$where .= " AND post_date <= '" . date( 'Y/m/d', strtotime( $endDate ) ) . "'";
	}

	return $where;
}

/**
 * Displays the Post older then current date
 * @uses posts_where filer for data range
 * @uses pre_get_posts hook
 */
function fonzie_filter_posts_by_date( $query ) {

	if ( $query->is_singular() ):
		return $query;
	endif;

	// Date filters for Posts
	if ( ! is_admin() && $query->is_main_query() && $query->query_vars['post_type'] != 'events' ) {
		$query->set( 'order', 'DESC' );
		add_filter( 'posts_where', 'fonzie_date_range' );
	}

	// Date filters for Events
	if ( isset( $query->query_vars['post_type'] ) && $query->query_vars['post_type'] == 'events' ) {

		$startDate = filter_input( INPUT_GET, 'startDate', FILTER_SANITIZE_SPECIAL_CHARS );
		$endDate   = filter_input( INPUT_GET, 'endDate', FILTER_SANITIZE_SPECIAL_CHARS );

		$meta_query = $query->get( 'meta_query' );

		if ( $startDate && $endDate ) {

			if ( gettype( $meta_query ) !== 'array' ) {
				$meta_query = null;
			}
			$meta_query[] = array(
				'relation' => 'OR',
				array(
					'relation' => 'OR',
					array(
						'key'     => 'start_date',
						'value'   => array(date( 'Y-m-d', strtotime( $startDate ) ), date( 'Y-m-d', strtotime( $endDate ) )),
						'compare' => 'between',
						'type'    => 'date'
					),
				),
				array(
					'relation' => 'OR',
					array(
						'key'     => 'end_date',
						'value'   => array(date( 'Y-m-d', strtotime( $startDate ) ), date( 'Y-m-d', strtotime( $endDate ) )),
						'compare' => 'between',
						'type'    => 'date'
					),
				)
			);

			$query->set( 'meta_query', $meta_query );

		}

	}


	return $query;
}

add_action( 'pre_get_posts', 'fonzie_filter_posts_by_date' );
