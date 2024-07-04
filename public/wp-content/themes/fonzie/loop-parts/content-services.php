<div class="content-block">
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">

			<h1 class="page-title heading_pull-top"><?php the_title(); ?></h1>

			<?php if ( has_post_thumbnail() ): ?>
				<figure class="featured-image">
					<?php the_post_thumbnail( 'post-featured-image' ); ?>
				</figure>
			<?php endif; ?>

			<?php if ( get_field( 'short_description' ) ): ?>
				<div class="section-intro--text">
					<?php the_field( 'short_description' ); ?>
				</div>
			<?php endif; ?>

			<?php
			if ( get_field( 'how_to_access_title' ) ):
				$_title = get_field( 'how_to_access_title' );
			else:
				$_title = __( 'About this service', 'charitypress_fonzie' );
			endif;
			?>
			<h2><?php echo $_title; ?></h2>

			<?php the_field( 'how_to_access' ); ?>

			<?php get_template_part( 'template-parts/service-information' ); ?>

			<?php get_template_part( 'template-parts/service-location' ); ?>

			<?php
			if ( have_rows( 'flexible_content_area' ) ):
				while ( have_rows( 'flexible_content_area' ) ) : the_row();
					$layout = get_row_layout();

					get_template_part( 'flexible/layout', $layout );
				endwhile;
			endif;
			?>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-12">
			<?php get_template_part( 'template-parts/related-services' ); ?>
		</div>
	</div>
</div>
