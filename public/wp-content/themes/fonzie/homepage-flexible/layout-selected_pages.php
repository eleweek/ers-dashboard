<section class="bg-very-light-grey selected-pages">

	<!-- .container-fluid -->
	<div class="container-fluid">

		<h2 class="text-center selected-pages__title">
			<?php the_sub_field('selected_pages_block_title'); ?>
		</h2>

		<div class="block__row">

			<?php
			while ( have_rows('selected_pages_pages') ) : the_row();

				$post = get_sub_field('selected_pages_page');

					setup_postdata($post); ?>

					<div class="block__item block__item--third block__item--page">
						<a href="<?php the_permalink(); ?>" class="block__content">
							<h3><?php echo get_the_title(); ?></h3>
							<?php the_excerpt(); ?>
							<div class="block__link">Read more ></div>
						</a>
					</div>

					<?php wp_reset_postdata(); ?>

			<?php endwhile; ?>

		</div>

	</div>
	<!-- /.container-fluid -->

</section>
