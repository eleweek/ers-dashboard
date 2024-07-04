<nav id="site-navigation" class="navbar navbar-static-top navbar-light bg-faded" role="navigation">
	<div class="container-fluid">
		<div class="row">
			<div class="mobile-bar clearfix">
				<button class="menu-toggle" aria-controls="primary-menu"
				        aria-expanded="false">
					<span class="menu-title"><?php esc_html_e( 'Menu', 'charitypress' ); ?></span>
					<!-- <span class="icon-bar-block">
						<span class="icon-bar top-bar"></span>
						<span class="icon-bar middle-bar"></span>
						<span class="icon-bar bottom-bar"></span>
					</span> -->
				</button>

				<button class="search-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Search', 'charitypress' ); ?></button>
			</div>

			<div id="navbar" class="navbar-wrapper navbar-collapse">
				<?php
					wp_nav_menu( array(
						'theme_location' => 'primary',
						'menu_id'        => 'primary-menu',
						'class'          => 'nav navbar-nav'
					) );

				?>
				<li class="navbar__more menu-item-has-children">
					<a href="#" class="navbar__more_btn"><?php _e('More', 'charitypress'); ?></a>
					<ul class="navbar__more_list sub-menu"></ul>
				</li>
				<?php

					get_template_part('searchform', 'mobile');
				?>
			</div>
		</div>
	</div>
</nav><!-- #site-navigation -->
