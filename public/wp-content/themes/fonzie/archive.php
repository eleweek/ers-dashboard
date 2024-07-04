<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

get_header();

	locate_template( 'loop-parts/listing-loop.php', true );

get_footer();
