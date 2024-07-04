<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CharityPress
 */

?>

<div class="clearfix">

	<?php
	while ( have_posts() ) : the_post();

		locate_template( 'loop-parts/list-type/listing-post.php', true, false );

	endwhile;
	?>

</div>
