<?php
get_header();
?>

	<div id="primary" class="content-area">
		<div class="container-fluid">
			<main id="main" class="site-main" role="main">

				<?php get_template_part( 'template-parts/job-post' ); ?>
				<?php get_template_part( 'template-parts/listing-grid' ); ?>
				<?php get_template_part( 'template-parts/campaign-progress' ); ?>
				<?php get_template_part( 'template-parts/homepage-campaign-block' ); ?>
				<?php get_template_part( 'template-parts/homepage-header' ); ?>
				<?php get_template_part( 'template-parts/service-post-information' ); ?>
				<?php get_template_part( 'template-parts/event-post-information' ); ?>
				<?php get_template_part( 'template-parts/listing-post' ); ?>

			</main>
		</div>
	</div>

<?php get_footer();
