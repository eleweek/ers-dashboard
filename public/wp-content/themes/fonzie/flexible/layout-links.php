<?php
$linksTitle = get_sub_field('links_title');
?>
<h3><?php echo $linksTitle; ?></h3>
<div class="row flexible-block">

<?php

// check if the repeater field has rows of data
if( have_rows('links_links') ):

 	// loop through the rows of data
    while ( have_rows('links_links') ) : the_row();

		$linkTitle = get_sub_field('links_link_title');
		$linkType = get_sub_field('links_link_type');
		$linkNewTab = get_sub_field('links_new_tab');
		if ($linkType == 'Internal Link') {
			$linkUrl = get_sub_field('links_internal_link');
		}
		else {
			$linkUrl = get_sub_field('links_external_link');
		}
		$linkImage = get_sub_field('links_link_image');
		$linkImageUrl = $linkImage['sizes']['block-links'];
		$linkImageAlt = $linkImage['alt'];

?>
    <div class="block__item block__item--double block__item--latest block__item--link">
        <a href="<?php echo $linkUrl; ?>" title="<?php echo $linkTitle; ?>" <?php $linkNewTab ? print 'target="_blank"' : ''; ?> class="block__content block__content--fixedimage">

<?php 	if ($linkImageUrl) { ?>
            <div class="block__image">
                <img src="<?php echo $linkImageUrl; ?>" alt="<?php echo $linkImageAlt; ?>">
            </div>
<?php } ?>

            <div class="block__text">
                <h2><?php echo $linkTitle; ?> <i class="icon caret"><?php include( fonzie_svg_path( "caret-right.svg" ) ); ?></i></h2>
            </div>
            <!-- /.blocks__content -->
        </a>
    </div>
<?php

    endwhile;

else :

    // no rows found

endif;

?>
</div>
