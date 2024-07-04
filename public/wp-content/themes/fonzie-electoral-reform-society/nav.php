<nav id="site-navigation" class="ers-navbar navbar navbar-static-top navbar-light bg-faded" role="navigation">
	<div class="container-fluid">
		<div class="row">
			<div class="mobile-bar clearfix">
				<button class="menu-toggle"
								aria-controls="primary-menu"
								aria-expanded="false">
					<span class="menu-title"><?php esc_html_e( 'Menu', 'charitypress' ); ?></span>
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

				<div class="navbar-extra">
					<a href="<?php echo get_field( 'ers_scotland_url', 'option' ); ?>" class="btn">
						ERS Scotland
					</a>

					<a href="<?php echo get_field( 'ers_northern_ireland_url', 'option' ); ?>" class="btn">
						ERS N.Ireland
					</a>

					<a href="<?php echo get_field( 'ers_cymru_url', 'option' ); ?>" class="btn">
						ERS Cymru
					</a>
				</div>

				<?php get_template_part( 'searchform', 'mobile' ); ?>
			</div>
		</div>
	</div>
</nav><!-- #site-navigation -->
