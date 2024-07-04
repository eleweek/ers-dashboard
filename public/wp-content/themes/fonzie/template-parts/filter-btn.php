<?php

$_query_obj = get_queried_object();

if ( isset( $_query_obj ) ) {
	$_selected = '';
}

if ( is_post_type_archive( get_post_type() ) ) {
	$_selected = ' btn_active';
}

?>
<nav class="btn-list">
	<ul>
		<li>
			<a href="<?php echo get_post_type_archive_link( get_post_type() ); ?>"
			   class="btn btn_white<?php echo $_selected; ?>">
				<span><?php _e( 'All', 'charitypress_fonzie' ); ?></span>
			</a>
		</li>

		<?php foreach ( $_terms as $_term ) : ?>
			<?php
			$url       = get_term_link( $_term );
			$_selected = $_query_obj->slug == $_term->slug ? ' btn_active' : '';
			?>
			<li>
				<a href="<?php echo $url; ?>" class="btn btn_white<?php echo $_selected; ?>">
					<span><?php _e( $_term->name, 'charitypress_fonzie' ); ?></span>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</nav>