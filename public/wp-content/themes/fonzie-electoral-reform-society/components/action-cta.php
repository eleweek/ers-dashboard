<?php if( get_field('show_cta') ): ?>

	<div id="action-cta-anchor" class="action-cta-anchor">

		<div class="action-cta" id="action-cta">

			<?php $cta_image = get_field('main_image'); ?>

			<?php if(!empty($cta_image)): ?>

				<div class="action-cta__image">

					<img
					src="<?php echo $cta_image['sizes']['block-image']; ?>"
					alt="<?php echo $cta_image['alt']; ?>">

				</div>

			<?php endif; ?>

			<div>

				<h3 class="action-cta__title"><?php echo get_field('main_title'); ?></h3>

				<?php echo get_field('main_text'); ?>

				<?php
				switch( get_field('main_button_location') ) {
					case '1':
						$_url = get_field('main_button_link_internal');
						break;
					case '2':
						$_url = get_field('main_button_link_external');
						break;
				}
				?>

				<a href="<?php echo $_url; ?>" class="btn action-cta__btn">
					<?php echo get_field('main_button_text'); ?> >
				</a>

			</div>

		</div>

	</div>

<?php endif; ?>
