<?php
function add_query_vars_filter( $vars ){
  $vars[] = "sortby";
  return $vars;
}
add_filter( 'query_vars', 'add_query_vars_filter' );
