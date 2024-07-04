<?php
// get options
$closeOtherItems = get_sub_field('close_other_items');
?>

<div class="row flexible-block">
	<div class="col-xs-12">
		<!-- .accordion -->
		<div class="accordion" data-close-other-items="<?php if ($closeOtherItems) {echo 'true';} else {echo 'false';} ?>"><!-- data-close-other-items determines whether other accordion items will be closed when you click and open one -->

<?php
// check if the repeater field has rows of data
if( have_rows('accordion_items') ):
 	// loop through the rows of data
    while ( have_rows('accordion_items') ) : the_row();

        // get the sub field values
        $heading = get_sub_field('accordion_item_heading');
        $content = get_sub_field('accordion_item_content');

		$showLink = get_sub_field('accordion_item_add_a_link');
        $linkTitle = get_sub_field('accordion_item_link_title');

		$linkNewTab = get_sub_field('accordion_item_links_new_tab');

		if( get_sub_field('accordion_item_link_location') == 'External Link' ):
			$link =  get_sub_field('accordion_item_external_link');
		elseif( get_sub_field('accordion_item_link_location') == 'Internal Link' ):
			$link = get_sub_field('accordion_item_internal_link');
		endif;
?>
			<!-- __item -->
			<div class="accordion__item">
				<h2 class="accordion__item__heading">
					<?php echo $heading; ?>
					<i class="icon plus"><?php include( fonzie_svg_path( "plus.svg" ) ); ?></i>
					<i class="icon minus"><?php include( fonzie_svg_path( "minus.svg" ) ); ?></i>
				</h2>
				<div class="accordion__item__content">
					<div class="clearfix">
						<?php echo $content; ?>
						<?php if ($showLink): ?>
						<a href="<?php if ($link) {echo $link;} else {echo '#';} ?>" <?php $linkNewTab ? print 'target="_blank"' : ''; ?> class="btn btn_borderless btn_icon-right">
							<span><?php echo $linkTitle; ?></span>
							<i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i>
						</a>
						<?php endif; ?>
					</div>
				</div>
			</div>
			<!-- /__item -->
<?php
    endwhile;
endif;
?>
		</div>
		<!-- /.accordion -->

	</div>
</div>
