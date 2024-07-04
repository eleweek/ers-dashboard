<?php

$_viaTwitter = get_field('share_twitter_name', 'option');
$_message = get_permalink();
$_emailSubject = get_the_title();
?>

<nav class="btn-list btn-list_social-share">
	<ul class="clearfix">
		<li>
			<a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>"
			   target="_new"
			   title="<?php _e('Share on Facebook', 'charitypress_fonzie'); ?>"
			   class="btn btn_icon-left btn_icon-facebook modal-btn">
				<i class="icon"><?php include( fonzie_svg_path( "facebook-square.svg" ) ); ?></i>
				<?php _e( 'Share', 'charitypress' ); ?>
			</a>
		</li>
		<li>
			<a href="https://twitter.com/intent/tweet?url=<?php the_permalink();?>&text=<?php the_title(); ?>&via=<?php echo $_viaTwitter; ?>"
			   target="_new"
			   title="<?php _e('Tweet this page', 'charitypress_fonzie'); ?>"
			   class="btn btn_icon-left btn_icon-twitter modal-btn">
				<i class="icon"><?php include( fonzie_svg_path( "twitter.svg" ) ); ?></i>
				<?php _e( 'Tweet', 'charitypress' ); ?>
			</a>
		</li>
		<li>
			<a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php the_permalink(); ?>&title=<?php the_title(); ?>&source=<?php bloginfo('name'); ?>"
			   target="_new"
			   title="<?php _e('Share on LinkedIn', 'charitypress_fonzie'); ?>"
			   class="btn btn_icon-left btn_icon-linkedin modal-btn">
				<i class="icon"><?php include( fonzie_svg_path( "linkedin.svg" ) ); ?></i>
				<?php _e( 'Share', 'charitypress' ); ?>
			</a>
		</li>
		<li>
			<a href="mailto:?subject=<?php echo $_emailSubject; ?>&body=<?php echo $_message; ?>"
			   title="<?php _e('Share via Email', 'charitypress_fonzie'); ?>"
			   class="btn btn_icon-left">
				<i class="icon"><?php include( fonzie_svg_path( "envelope.svg" ) ); ?></i>
				<?php _e( 'Email', 'charitypress' ); ?>
			</a>
		</li>
	</ul>
</nav>
