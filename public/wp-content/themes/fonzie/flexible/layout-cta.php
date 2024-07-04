<?php
$ctaText = get_sub_field('cta_text');
$ctaLinkTitle = get_sub_field('cta_link_title');
$linkNewTab = get_sub_field('cta_links_new_tab');

if( get_sub_field('cta_link_location') == 'External Link' ):
	$ctaLink =  get_sub_field('cta_external_link');
elseif( get_sub_field('cta_link_location') == 'Internal Link' ):
	$ctaLink = get_sub_field('cta_internal_link');
endif;
?>

<div class="row">
	<div class="col-xs-12">
		<a href="<?php if ($ctaLink) { echo $ctaLink; } else { echo '#';} ?>" <?php $linkNewTab ? print 'target="_blank"' : ''; ?> class="cta">
			<?php if ($ctaText): ?>
			<div class="cta__text">
				<?php echo $ctaText; ?>
			</div>
			<?php endif; ?>
			<?php if ($ctaText): ?>
			<div class="cta__button">
				<?php echo $ctaLinkTitle; ?>
			</div>
			<?php endif; ?>
		</a>
	</div>
</div>
