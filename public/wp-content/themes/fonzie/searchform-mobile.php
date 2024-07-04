<form role="search" class="navbar__search" method="get" action="<?php echo home_url( '/' ); ?>">
	<input type="text" placeholder="I'm looking for..." aria-label="Search for:" value="<?php echo get_search_query() ?>" name="s" title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>">
	<input type="submit" value="Search" class="btn btn_secondary">
</form>
