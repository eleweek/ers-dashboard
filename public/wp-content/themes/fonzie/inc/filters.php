<?php
/**
 * @param array $_filters
 *
 * @return array
 */
function check_queried_filters( $_filters ) {

	if ( ! is_array( $_filters ) ) {
		$_filters = (array) $_filters;
	}

	$_filtered = array();

	foreach ( $_filters as $_filter ):
		$_filtered[ $_filter ] = filter_input( INPUT_GET, $_filter, FILTER_SANITIZE_STRING );
	endforeach;

	return $_filtered;

}

function check_filter_type( $_posttype ) {

	if ( $_posttype == 'jobs' || $_posttype == 'actions' || $_posttype == 'services' ):
		return 'btn';
	else:
		return 'select';
	endif;

}

function build_select_filters( $slug, $term, $selected = '' ) {
	$_wrapper = '<option value="%1$s" %2$s>%3$s</option>';

	return sprintf( $_wrapper, $slug, $selected, $term->name );
}
