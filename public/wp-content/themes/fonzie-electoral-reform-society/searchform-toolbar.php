<form role="search" method="get" class="ers-toolbar__search-form" action="<?php echo home_url( '/' ); ?>">
	<label for="ers-toolbar__search-form-input sr-only"><?php echo _x( 'Search for:', 'label' ) ?></label>

	<input id="ers-toolbar__search-form-input" type="search" placeholder="What are you looking for?"
				 value="<?php echo get_search_query() ?>" name="s"
				 title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>"/>

	<button class="btn btn_secondary" title="Search">
		<?php echo esc_attr_x( 'Search', 'submit button' ) ?>
	</button>
</form>
