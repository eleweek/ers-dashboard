<?php
/**
 * Electoral Reform Society functions and definitions.
 *
 * Use get_stylesheet_directory_uri() to get the http path to your child theme,
 * to load styles, scripts and other resources.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package Electoral Reform Society
 */

 /**
  * Fix for https://wpml.org/forums/topic/duplicated-string-in-permalinks-with-different-domains-per-language-and-yoast/
  * Pierre @ WPML - 08/01/2016
  */
 function wpmlsupp_2563_fix_duplicated_uri( $home_url, $url, $path, $orig_scheme, $blog_id ) {

     $lang_negociation = apply_filters( 'wpml_setting', null, 'language_negotiation_type' );

     if ( $lang_negociation == 2 ) {
         $home_url_parsed = parse_url( $home_url );
         if ( isset( $home_url_parsed['query'] ) ) {
             $url_parsed = parse_url( $url );
             $home_url_parsed['query']   = '?' . $url_parsed['query'];
             $home_url_parsed['scheme'] .= '://';

             $home_url = implode( '', $home_url_parsed );
         }
     }

     return $home_url;
 }
 add_filter( 'wpml_get_home_url', 'wpmlsupp_2563_fix_duplicated_uri', 20, 5 );


 /**
  * Theme setup.
  */
 include_once( 'inc/setup.php' );

 /**
  * Enqueue scripts and styles.
  */
 include_once( 'inc/enqueue.php' );

 /**
  * Custom post types
  */
 include_once( 'inc/cpts/publications.php' );
 include_once( 'inc/cpts/briefings.php' );
 include_once( 'inc/cpts/press-releases.php' );
 include_once( 'inc/cpts/candidates.php' );

 /**
  * Custom post types
  */
 include_once( 'inc/taxonomies/publications-categories.php' );
 include_once( 'inc/taxonomies/briefings-categories.php' );
 include_once( 'inc/taxonomies/candidates-categories.php' );
 include_once( 'inc/taxonomies/pressreleases-categories.php' );
 //include_once( 'inc/taxonomies/nations-categories.php' );

 /**
  * Fieldgroups
  */
 include_once( 'inc/fieldgroups/publications.php' );
 include_once( 'inc/fieldgroups/action-cta.php' );
 include_once( 'inc/fieldgroups/action-cta-voting.php' );
 include_once( 'inc/fieldgroups/campaigns.php' );
 include_once( 'inc/fieldgroups/voting-leader.php' );
 include_once( 'inc/fieldgroups/voting-type.php' );
 include_once( 'inc/fieldgroups/national-page.php' );
 include_once( 'inc/fieldgroups/selected-pages.php' );
 include_once( 'inc/fieldgroups/team-block.php' );

 /**
  * Add query vars
  */
 include_once( 'inc/query_vars.php' );




