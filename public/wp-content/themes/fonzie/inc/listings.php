<?php

//class string builder, mainly used for listing grid variations
function class_string( $_classes, $_echo = true, $_append = false ) {

	$_class_string = '';
	$_class_array  = array();

	if ( is_array( $_classes ) ) :

		foreach ( $_classes as $_class ):
			$_class_array[] = $_class;
		endforeach;

		$_class_string = implode( ' ', $_class_array );

		if ( $_append ):
			$_class_string = ' ' . $_class_string;
		endif;

	endif;

	if ( $_echo ):
		echo $_class_string;
	else:
		return $_class_string;
	endif;


}

function first_term( $post ) {

	if( $post->post_type == 'post' ):
		$taxonomy = 'category';
	else:
		$taxonomy = $post->post_type . '-category';
	endif;

	$_terms = get_the_terms( $post->post_id, $taxonomy );
	if( is_array( $_terms ) ):
		$_single_term = array_slice( $_terms, 0, 1 );
		$_single_term = $_single_term[0]->name;
		return $_single_term;
	endif;

	return false;
}

function highlighted_term( $post ) {

	$_terms = get_the_terms( $post->post_id, $post->post_type . '-category' );

	if( is_array( $_terms ) ):
		$_single_term = array_slice( $_terms, 0, 1 );
		$_highlighted = get_field('highlighted_listing_type', $_single_term[0]->taxonomy . '_' . $_single_term[0]->term_id);

		if( $_highlighted != null )
			return true;

	endif;

	return false;
}


function news_posted_at( $format = true ) {

	$time_string = get_the_date( 'd M Y');

    $posted_on = sprintf( __( 'Posted %s', 'charitypress_fonzie' ) , $time_string ) ;

	if( $format ):
		echo '<p class="date">' . $posted_on . '</p>';
	else:
		echo $posted_on;
	endif;

}

function news_posted_at_long() {

	$time_string = get_the_date( 'jS F Y');

	$posted_on = sprintf( __( 'Posted on the %s', 'charitypress_fonzie' ) , $time_string ) ;

	echo '<p class="date">' . $posted_on . '</p>';

}

function get_url_string( $_url ){
	$_req = parse_url( $_url );
	$_path = $_req['path'];
	return substr( $_path, strlen('/') );
}
