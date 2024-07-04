<?php
/**
 * Improve security.
 *
 * @package CharityPress
 */

/*
 * Remove generator.
 */
remove_action ( 'wp_head', 'wp_generator' );

/*
 * Disable file editing.
 */
 if (!defined( 'DISALLOW_FILE_EDIT' )) {
 	define( 'DISALLOW_FILE_EDIT', true );
 }
