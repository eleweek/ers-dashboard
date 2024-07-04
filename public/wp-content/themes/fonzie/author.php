<?php
/**
 * The template for displaying Authors. Re-directs to home URL to prevent user enumeration.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

header( 'Location: ' . get_home_url() );
