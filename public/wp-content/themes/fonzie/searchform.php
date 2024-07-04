<form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
	<label for="search-form__input">
		<span class="screen-reader-text"><?php echo _x( 'Search for:', 'label' ) ?></span>
	</label>
	<div class="search-form__inner">
		<input id="search-form__input" type="search" class="search-form__input" placeholder="I'm looking for..."
					 value="<?php echo get_search_query() ?>" name="s"
					 title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>"/>
		<button class="search-form__submit" title="Search">
			<span class="screen-reader-text"><?php echo esc_attr_x( 'Search', 'submit button' ) ?></span>
			<?php include( fonzie_svg_path( "search.svg" ) ); ?>
		</button>
	</div>
</form>
