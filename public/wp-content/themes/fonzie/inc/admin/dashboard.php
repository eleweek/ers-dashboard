<?php
/**
 * Dashboard widget improvements.
 *
 * @package Fonzie
 */

/**
 * Remove default dashboard widgets, add custom widgets.
 */
function fonzie_dashboard_widgets() {
	global $wp_meta_boxes;

	/**
	 * Remove widgets.
	 */
	$wp_meta_boxes[ 'dashboard' ] = [];

	/**
	 * Add widgets.
	 */
	if ( get_bloginfo( 'name' ) ) {
		$meta_box_title = 'Welcome to ' . get_bloginfo( 'name' );
	} else {
		$meta_box_title = 'Welcome to your site';
	}

	wp_add_dashboard_widget( 'fonzie_welcome', $meta_box_title, function() {
?>
	<p>
		Welcome to your new website. We've put together a list of things below
		you might want to do to get you started:
	</p>

	<table class="widefat" cellspacing="0">
		<tbody>
			<tr class="alternate">
				<td class="row-title">
					<a href="<?php echo admin_url( 'customize.php' ); ?>">
						Customise your site
					</a>
				</td>
			</tr>

			<tr>
				<td class="row-title">
					<a href="<?php echo admin_url( 'edit.php?post_type=page' ); ?>">
						Add content to your Pages
					</a>
				</td>
			</tr>

			<tr class="alternate">
				<td class="row-title">
					<a href="<?php echo admin_url( 'post-new.php' ); ?>">
						Write a News post
					</a>
				</td>
			</tr>
		</tbody>
	</table>
<?php
	});
}
add_action( 'wp_dashboard_setup', 'fonzie_dashboard_widgets', 999 );
