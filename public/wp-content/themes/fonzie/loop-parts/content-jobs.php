<div class="content-block">
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">

			<h1 class="page-title job-title heading_pull-top"><?php the_title(); ?></h1>

			<?php if ( get_field( 'location' ) ): ?>
				<h2 class="job-location"><?php the_field( 'location' ); ?></h2>
			<?php endif; ?>

			<?php get_template_part( 'template-parts/job-information' ); ?>

			<?php if ( has_post_thumbnail() ): ?>
				<figure class="featured-image">
					<?php the_post_thumbnail( 'post-featured-image' ); ?>
				</figure>
			<?php endif; ?>

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
</div>
