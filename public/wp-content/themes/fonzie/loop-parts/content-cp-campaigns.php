<div class="content-block">
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">

			<h1 class="page-title heading_pull-top"><?php the_title(); ?></h1>

			<?php get_template_part( 'template-parts/social-share' ); ?>

			<?php locate_template( 'template-parts/campaign-progress.php', true ); ?>

			<?php if( has_post_thumbnail() ): ?>
				<figure class="featured-image">
					<?php the_post_thumbnail('post-featured-image'); ?>
				</figure>
			<?php endif; ?>

			<?php
			if ( have_rows('flexible_content_area') ):
				while ( have_rows('flexible_content_area') ) : the_row();
					$layout = get_row_layout();

					get_template_part( 'flexible/layout', $layout );
				endwhile;
			endif;
			?>


			<?php

				$buttons = get_field('cp_donate_buttons');
				$donation_reg_url = get_rdd_process_page();
				$donation_single_url = get_rdd_process_page();
			?>

			<?php foreach ($buttons as $button) : ?>

				<div class="col-md-4">
					<p><?php echo $button['cp_donation_text']  ?></p>
					<a href="<?php echo $donation_reg_url; ?>?amount=<?php echo $button['cp_donation_amount'] ?>" class="btn btn-block"><?php echo $button['cp_button_text'] ?></a>
				</div>

			<?php endforeach ?>



		</div>
	</div>
</div>
