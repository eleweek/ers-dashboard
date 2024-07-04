<?php
/**
 * Template part for displaying a message that posts cannot be found.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

?>

<div class="listing-post-none">

	<div class="section-intro--text"><p><?php _e('Sorry, there were no matches for your query terms. Please try again with a different filter.', 'charitypress_fonzie'); ?></p></div>

	<p><a href="<?php echo esc_url( remove_query_arg( array('events-category', 'jobs-category', 'services-category', 'startDate', 'endDate' ) ) ); ?>" class="btn btn-primary"><?php _e('Clear Filters', 'charitypress_fonzie'); ?></a></p>

</div><!-- /.listing-post-none -->
