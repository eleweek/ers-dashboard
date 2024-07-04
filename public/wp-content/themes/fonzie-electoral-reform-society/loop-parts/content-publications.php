<?php
	$featuredImageSwitch = get_field('featured_image_switch');
?>

<div class="content-block">
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">

			<?php icl_post_languages(); ?>
			<h1 class="page-title heading_pull-top"><?php the_title(); ?></h1>
			<?php get_template_part( 'components/author' ); ?>
			<?php news_posted_at_long(); ?>

		</div>

	</div>

	<?php if ( have_rows('publication_sections') ): ?>

		<div class="jump-list">

			<div class="row">
				<div class="col-lg-8 col-lg-offset-2">

					<div class="jump-list__title">Contents</div>

					<div class="jump-list__content">

						<?php $titleCount = 0; ?>
						<?php $subCount = 0; ?>

						<?php while ( have_rows('publication_sections') ) : the_row();

							$titleCount++;	?>

							<div>

								<div class="jump-list__sub-title"><?php echo $titleCount . '. ' . get_sub_field('publication_section_title'); ?></div>

								<?php if ( have_rows('publication_sub_section') ): ?>

									<ol class="jump-list__list">

										<?php
										while ( have_rows('publication_sub_section') ) : the_row();

											$subCount++; ?>

											<li class="jump-list__list-item">
												<a href="#sub-section-<?php echo $subCount; ?>">
													<?php echo get_sub_field('publication_sub_section_title'); ?>
												</a>
											</li>

										<?php endwhile; ?>

									</ol>

								<?php endif; ?>

							</div>

						<?php endwhile; ?>

					</div>

				</div>

			</div>

		</div>

	<?php endif; ?>

	<?php
	$_fileObj = get_field( 'publication_file' );

		if($_fileObj):

			$_path = get_attached_file( $_fileObj['id'] );
			$_fi = new finfo(FILEINFO_MIME_TYPE);
			$_finfo = $_fi->file( $_path );
			$_filesize = human_filesize( filesize( $_path ), 1 );

			$_linkText = 'Download as file';

			if( $_finfo == 'application/pdf' ):
				$_format = ' pdf';
			elseif( $_finfo == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
			        $_finfo == 'application/vnd.ms-word.document.macroEnabled.12' ||
			        $_finfo == 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' ||
			        $_finfo == 'application/vnd.ms-word.template.macroEnabled.12' ):
				$_format = ' document';
			else:
				$_format = '';
			endif;

		?>

		<div class="row flexible-block">
			<div class="col-lg-8 col-lg-offset-2">

				<a href="<?php echo $_fileObj['url']; ?>" download class="btn btn_outlined btn_download btn_icon-right" target="_blank">
					<span><?php _e($_linkText, 'charitypress_fonzie'); ?> <span><?php printf( '(%s%s)', $_filesize, $_format) ;?></span></span>
					<i class="icon"><?php include( fonzie_svg_path( "cloud-download.svg" ) ); ?></i>
				</a>

			</div>
		</div>

	<?php endif; ?>

	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">

			<?php
			if ( have_rows('publication_sections') ):

				$count_alt = 0;

				while ( have_rows('publication_sections') ) : the_row(); ?>

					<h2>
						<?php echo get_sub_field('publication_section_title'); ?>
					</h2>

					<?php
					if ( have_rows('publication_sub_section') ):

						while ( have_rows('publication_sub_section') ) : the_row();

							$count_alt++; ?>

							<div id="sub-section-<?php echo $count_alt; ?>">

								<h3><?php echo get_sub_field('publication_sub_section_title'); ?></h3>

								<?php echo get_sub_field('publication_sub_section_content'); ?>

							</div>

						<?php
						endwhile;

					endif;

				endwhile;

			endif;
			?>

			<?php get_template_part( 'template-parts/social-share' ); ?>
			<?php get_template_part( 'template-parts/tags' ); ?>

		</div>
	</div>
</div>

<?php
$_args   = array(
	'posts_per_page' => 2,
	'post_type'      => 'publications',
	'post__not_in'		 => array($post->ID)
);
$_publications = new WP_Query( $_args );
$_archive_page = get_option('options_publications_archive_page');

if ( $_publications->have_posts() ):
	?>

	<div class="content-block">
		<div class="row">
			<div class="col-xs-12"><h3><?php esc_html_e( 'Read more publications...', 'charitypress_fonzie' ); ?></h3></div>

			<div class="col-xs-12">
				<?php
				while ( $_publications->have_posts() ): $_publications->the_post();

					locate_template( 'loop-parts/list-type/listing-publications.php', true, false );

				endwhile;
				?>
			</div>

			<div class="col-xs-12 text-right">
				<a href="<?php echo get_permalink( $_archive_page ); ?>" class="btn btn_right"><?php esc_html_e( 'View all publications', 'charitypress_fonzie' ); ?></a>
			</div>
		</div>
	</div>

	<?php
endif;
?>
