<!-- campaign block -->
<section class="padding-top-60">

	<!-- .container-fluid -->
	<div class="container-fluid">


		<?php
		// get raised so far and target amounts and figure out the percentage raised
		$raised      		= get_sub_field( 'hcb_raised_so_far' );
		$target      		= get_sub_field( 'hcb_target' );
		$title       		= get_sub_field( 'hcb_title' );
		$description 		= get_sub_field( 'hcb_description' );
		$linkText    		= get_sub_field( 'hcb_link_text' );
		$_target     		= get_sub_field( 'hcb_show_target' );
		$_video_or_image 	= get_sub_field( 'hcb_video_or_image' );
		$video 				= get_sub_field( 'hcb_video' );
		$image 				= get_sub_field( 'hcb_image' );

		switch( get_sub_field('hcb_link_location') ){
			case '1':
				$_url = get_the_permalink( get_sub_field('hcb_link_internal_url') );
				break;
			case '2':
				$_url = get_sub_field('hcb_link_external_url');
				break;
		}

		?>

		<div class="homepage-campaign-block">
			<div class="homepage-campaign-block__content">
				<div class="homepage-campaign-block__content__text">
					<h2><?php if ($title) echo $title; ?></h2>
					<?php if ($description) echo ($_target) ? limit_words($description, 25) : limit_words($description, 30); ?>
					<a href="<?php echo $_url; ?>" class="btn btn_borderless btn_icon-right">
						<span><?php if ($linkText) echo $linkText; ?></span>
						<i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
					</a>
				</div>
				<?php if( $_target ) :?>
				<div class="campaign-progress">
					<!-- .progress-container -->
					<div class="progress-container">
						<div class="progress-bar" data-percent="<?php ($target && $raised) ? print round( ( $raised / $target ) * 100 ) : print '0';  ?>">
							<span class="progress-bar-value"></span>
						</div>
					</div>
					<!-- /.progress-container -->
					<p><strong data-raised="<?php if($raised) {echo $raised;} else {echo '0';} ?>" class="raised-value">£0</strong> raised so far of <strong><?php if($target) {echo '£' . number_format($target);} else {echo '0';} ?></strong> target</p>
				</div>
				<?php endif; ?>
			</div>
			<?php if( $_video_or_image == 'Video'): ?>
			<div class="homepage-campaign-block__video">
				<div class="embed-container">
					<?php echo $video; ?>
				</div>
			</div>
			<?php elseif( $_video_or_image == 'Image'): ?>
			<div class="homepage-campaign-block__image">
				<div class="embed-container">
					<div class="embed-container__image" style="background-image: url(<?php echo $image; ?>)"></div>
				</div>
			</div>
			<?php endif; ?>
		</div>

	</div>
	<!-- /.container-fluid -->

</section>
<!-- /campaign block -->
