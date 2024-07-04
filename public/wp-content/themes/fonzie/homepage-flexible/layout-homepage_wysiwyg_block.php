<section class="padding-top-30 padding-bottom-30">
	<div class="container-fluid">
		<div class="homepage-wysiwyg-block">

			<?php if( get_sub_field('homepage_wysiwyg_block_heading') ): ?>
				<h2 class="text-center selected-pages__title"><?php the_sub_field('homepage_wysiwyg_block_heading'); ?></h2>
			<?php endif; ?>

			<?php
				// check if the repeater field has rows of data
				if( have_rows('homepage_wysiwyg_block_row') ):
				 	// loop through the rows of data
				    while ( have_rows('homepage_wysiwyg_block_row') ) : the_row();
					?>

						<div class="block__row">

							<?php
							// check if the repeater field has rows of data
							if( have_rows('homepage_wysiwyg_block_items') ):
								$count = 0;

								while ( have_rows('homepage_wysiwyg_block_items') ) : the_row();
									$count ++;
								endwhile;

							 	// loop through the rows of data
							    while ( have_rows('homepage_wysiwyg_block_items') ) : the_row();
									$noBorder = get_sub_field('homepage_wysiwyg_block_remove_border');
								?>
									<div class="block__item<?php $noBorder == true ? print ' block__item--no-border' : ''; ?><?php $count == 2 ? print ' block__item--double' : print ' block__item--third'; ?>">
										<div class="block__content">
											<div class="block__text">
												<?php echo get_sub_field('homepage_wysiwyg_block_item'); ?>
											</div>
										</div>
									</div>
								<?php
								endwhile;
							endif;
							?>

						</div><!-- /.block__row -->

					<?php
				    endwhile;
				endif;
			?>

		</div>
	</div>
</section>
