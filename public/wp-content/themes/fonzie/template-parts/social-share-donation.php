<div class="donations-share btn-list">
	<?php //$_viaTwitter = get_url_string( get_field( 'twitter', 'option' ) ); ?>
	<?php $_viaTwitter = get_field('share_twitter_name', 'option'); ?>
	<?php $_message = get_field('share_message', 'option'); ?>
	<?php $_emailSubject = 'Donate'; ?>
	<ul>
		<li>
			<a href="http://www.facebook.com/sharer/sharer.php?u=<?php the_rdd_landing_page(); ?>"
			   title="<?php _e('Share on Facebook', 'charitypress'); ?>"
			   class="btn btn_icon-left btn_bg-facebook btn_donation btn_social-share modal-btn">
				<i class="icon"><?php include( fonzie_svg_path( "facebook.svg" ) ); ?></i>
				<?php _e( 'Share', 'charitypress' ); ?>
			</a>
		</li>
		<li>
			<a href="http://twitter.com/share?url=<?php the_rdd_landing_page();?>&text=<?php echo $_message; ?>&via=<?php echo $_viaTwitter; ?>"
			   title="<?php _e('Tweet about your Donation', 'charitypress'); ?>"
			   class="btn btn_icon-left btn_bg-twitter btn_donation modal-btn">
				<i class="icon"><?php include( fonzie_svg_path( "twitter.svg" ) ); ?></i>
				<?php _e( 'Tweet', 'charitypress' ); ?>
			</a>
		</li>
		<li>
			<a href="mailto:?subject=<?php echo $_emailSubject; ?>&body=<?php echo $_message; ?>"
			   title="<?php _e('Tell someone about your Donation', 'charitypress'); ?>"
			   class="btn btn_icon-left btn_bg-email btn_donation">
				<i class="icon"><?php include( fonzie_svg_path( "envelope.svg" ) ); ?></i>
				<?php _e( 'Email', 'charitypress' ); ?>
			</a>
		</li>
	</ul>
</div>
