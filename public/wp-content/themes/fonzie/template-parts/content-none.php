<?php
/**
 * Template part for displaying a message that posts cannot be found.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

?>

<section class="no-results not-found intro-block intro-block_left">
	<header class="page-header">
		<h1 class="page-title heading_pull-top"><?php esc_html_e( 'Nothing Found', 'charitypress' ); ?></h1>
	</header><!-- .page-header -->

	<div class="page-content">
		<?php
		$queried_object = get_queried_object();

		if ( is_search() ) : ?>

			<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'charitypress' ); ?></p>
			<?php
				get_search_form();


		elseif( isset($queried_object->taxonomy) || is_home() ):

			?>
			<div class="section-intro--text"><p><?php _e('Sorry, there were no matches for your query terms. Please try again with a different filter.', 'charitypress_fonzie'); ?></p></div>

			<p><a href="<?php echo esc_url( remove_query_arg( array('events-category', 'jobs-category', 'services-category', 'startDate', 'endDate' ) ) ); ?>" class="btn btn-primary"><?php _e('Clear Filters', 'charitypress_fonzie'); ?></a></p>

			<?php

		else : ?>

			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'charitypress' ); ?></p>
			<?php
				get_search_form();

		endif; ?>
	</div><!-- .page-content -->
</section><!-- .no-results -->
