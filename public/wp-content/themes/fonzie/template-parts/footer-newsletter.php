<div class="newsletter-signup">
	<div class="container-fluid">

		<div class="newsletter-signup__form">
			<h4 class="newsletter-signup__title"><?php the_field('newsletter_title', 'option'); ?></h4>
			<?php
				if ( function_exists( 'gravity_form' ) ) {
					$footer_form = get_field('newsletter_form', 'options');
					gravity_form($footer_form['id'], true, true, false, null, true);
				}
			?>
		</div>

	</div>
</div>
