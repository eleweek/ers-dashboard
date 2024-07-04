<?php
/**
 * WordPress Bootstrap Pagination
 */

function wp_bootstrap_pagination( $args = array() ) {


	$defaults = array(
		'range'           => 4,
		'custom_query'    => FALSE,
		'previous_string' => __( 'Previous', 'charitypress' ),
		'next_string'     => __( 'Next', 'charitypress' ),
		'before_output'   => '<nav class="btn-list text-center">',
		'before_list'     => '<ul>',
		'after_list'      => '</ul>',
		'after_output'    => '</nav>'
	);

	$args = wp_parse_args(
		$args,
		apply_filters( 'wp_bootstrap_pagination_defaults', $defaults )
	);

	$args['range'] = (int) $args['range'] - 1;
	if ( !$args['custom_query'] )
		$args['custom_query'] = @$GLOBALS['wp_query'];
	$count = (int) $args['custom_query']->max_num_pages;
	$page  = intval( get_query_var( 'paged' ) );
	$ceil  = ceil( $args['range'] / 2 );

	if ( $count <= 1 )
		return FALSE;

	if ( !$page )
		$page = 1;

	if ( $count > $args['range'] ) {
		if ( $page <= $args['range'] ) {
			$min = 1;
			$max = $args['range'] + 1;
		} elseif ( $page >= ($count - $ceil) ) {
			$min = $count - $args['range'];
			$max = $count;
		} elseif ( $page >= $args['range'] && $page < ($count - $ceil) ) {
			$min = $page - $ceil;
			$max = $page + $ceil;
		}
	} else {
		$min = 1;
		$max = $count;
	}

	$echo = '';
	$previous = intval($page) - 1;
	$previous = esc_attr( get_pagenum_link($previous) );

	ob_start();
	include( fonzie_svg_path( "caret-left.svg" ) );
	$caret_left = ob_get_clean();

	ob_start();
	include( fonzie_svg_path( "caret-right.svg" ) );
	$caret_right = ob_get_clean();

	$prevText = '<li>';
	if ( $previous && (1 != $page) ):
		$prevText .= '<a href="' . $previous . '" title="' . __( 'previous', 'charitypress') . '" class="btn btn_borderless btn_icon-left"><i class="icon">'.$caret_left.'</i><span>' . $args['previous_string'] . '</span></a>';
	endif;
	$prevText .= '</li>';

	if ( !empty($min) && !empty($max) ) {
		for( $i = $min; $i <= $max; $i++ ) {
			if ($page == $i) {
				$echo .= '<li><span class="btn btn_white btn_active">' . $i . '</span></li>';
			} else {
				$echo .= sprintf( '<li><a href="%s" class="btn btn_white">%s</a></li>', esc_attr( get_pagenum_link($i) ), $i );
			}
		}
	}

	$next = intval($page) + 1;
	$next = esc_attr( get_pagenum_link($next) );
	$nextText = '<li>';
	if ($next && ($count != $page) ):
		$nextText .= '<a href="' . $next . '" title="' . __( 'next', 'charitypress') . '" class="btn btn_borderless btn_icon-right"><span>' . $args['next_string'] . '</span><i class="icon">'. $caret_right .'</i></a>';
	endif;
	$nextText .= '</li>';


	if ( isset($echo) )
		echo $args['before_output'] . $args['before_list']. $prevText . $echo . $nextText . $args['after_list'] . $args['after_output'];
}