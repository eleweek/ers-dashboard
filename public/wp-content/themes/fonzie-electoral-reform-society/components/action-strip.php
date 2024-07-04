<?php if( get_field('show_cta') ): ?>

	<div class="action-strip">

		<div class="container-fluid">

			<div class="row">

				<div class="col-md-8 col-md-offset-2">

					<span class="action-strip__text"><?php echo get_field('cta_strip_text'); ?></span>

					<a href="#action-cta-anchor" class="btn action-strip__btn">
						<?php echo get_field('cta_strip_button_text'); ?>
					</a>

				</div>

			</div>

		</div>

	</div>

<?php endif; ?>
