<?php

$_query_obj = get_queried_object();

if ( isset( $_query_obj ) ) {
	$_selected = '';
}

if ( is_post_type_archive( get_post_type() ) ) {
	$_selected = ' btn_active';
}

if ( get_post_type() == 'post' ) {
	$_query_obj_slug = get_query_var( 'category_name' );
} else {
	$_query_obj_slug = $_query_obj->slug;
}

// if ( get_post_type() == 'post' ) {
// 	$_clear_url = get_permalink( get_option( 'page_for_posts', true ) );
// } else {
// 	$_clear_url = get_post_type_archive_link( get_post_type() );
// }

?>
<div class="row">
	<div class="col-xs-12 col-md-12">
		<div class="list-filters">
			<div class="filter_select">
				<label for="<?php echo $_termSlug; ?>"><?php _e( 'View by category', 'charitypress_fonzie' ); ?></label>
				<select name="<?php echo $_termSlug; ?>" id="<?php echo $_termSlug; ?>" class="category-select">
					<option value=""
					        class="placeholder"><?php echo __( 'Choose a category', 'charitypress_fonzie' ) ?></option>
					<?php foreach ( $_terms as $_term ):
						var_dump($_term->parent);
						// if ( $_term->parent == 0 ):
							$_selected = $_query_obj_slug == $_term->slug ? 'selected="selected"' : '';
							$url       = get_term_link( $_term );
							echo build_select_filters( $_term->slug, $_term, $_selected );
						// endif;
					endforeach;
					?>
				</select>
			</div>
			<div class="filter_select">
				<label for="date"><?php _e( 'View by date', 'charitypress_fonzie' ); ?></label>
				<?php if( get_post_type() == 'events' ): ?>
					<input type="text" id="date" name="daterange" value="" class="daterange" readonly/>
				<?php else : ?>
					<input type="text" id="date" name="daterange" value="" class="daterange-past" readonly/>
				<?php endif; ?>
			</div>

		</div>
	</div>
</div>
