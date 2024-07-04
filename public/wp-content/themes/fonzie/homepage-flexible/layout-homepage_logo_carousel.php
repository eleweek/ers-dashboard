<section class="homepage-logo-carousel padding-top-30 padding-bottom-30">
	<div class="container-fluid">
		<?php if ( get_sub_field( 'carousel_title' ) ): ?>
		<h3><?php the_sub_field( 'carousel_title' ); ?></h3>
		<?php endif; ?>

		<div class="padding-top-60 padding-bottom-60">
			<div class="slick-slider-container">
				<div class="slick-slider">
					<?php
						$i = 0;

						while( have_rows( 'logo_slide' ) ): the_row();
							$logo = get_sub_field( 'logo' );
					?>
					<div class="slick-slide">
						<a class="homepage-logo-carousel__item" href="#" data-slide="<?php echo $i; ?>" data-title="<?php the_sub_field( 'title' ); ?>" data-description="<?php the_sub_field( 'description' ); ?>" data-show-link="<?php echo ( get_sub_field( 'add_an_external_link' ) ) ? get_sub_field( 'add_an_external_link' ) : '0'; ?>" data-link-text="<?php the_sub_field( 'link_text' ); ?>" data-url="<?php the_sub_field( 'link_url' ); ?>">
							<img class="homepage-logo-carousel__logo" src="<?php echo $logo['sizes']['logo-carousel']; ?>" alt="<?php echo $logo['alt']; ?>" />
						</a>
					</div>
					<?php
							$i++;
						endwhile;
					?>
				</div>

				<a class="slick-prev" href="#">
					<?php include( fonzie_svg_path( 'chevron-left.svg' ) ); ?>
				</a>

				<a class="slick-next" href="#">
					<?php include( fonzie_svg_path( 'chevron-right.svg' ) ); ?>
				</a>
			</div>

			<div class="homepage-logo-carousel-desc">
				<h3 class="homepage-logo-carousel-desc__title"></h3>

				<p class="homepage-logo-carousel-desc__text"></p>

				<p class="homepage-logo-carousel-desc__link-container">
					<a class="homepage-logo-carousel-desc__link font-weight-bold" href="#" target="_blank">
						<span class="homepage-logo-carousel-desc__link-text"></span> <span class="icon"><?php include( fonzie_svg_path( 'caret-right.svg' ) ); ?></span>
					</a>
				</p>
			</div>
		</div>
	</div>
</section>
