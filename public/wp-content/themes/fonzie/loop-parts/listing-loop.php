<div id="primary" class="content-area">
	<div class="container-fluid">
		<main id="main" class="site-main" role="main">
			<?php

				locate_template( 'template-parts/page_intro.php', true );

				if ( have_posts() ) :
				locate_template( 'template-parts/filters.php', true );

				/* Start the Loop */

				locate_template( 'loop-parts/content-list-' . get_post_type() . '.php', true );

				if ( function_exists( 'wp_bootstrap_pagination' ) ):
					wp_bootstrap_pagination();
				endif;

				else :

					get_template_part( 'template-parts/archive', 'none' );

				endif; ?>

		</main><!-- #main -->
	</div>
</div><!-- #primary -->
