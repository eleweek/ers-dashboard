<?php 
// get image values
$imageBlockImage = get_sub_field('image-block-image');
$imageBlockImageId = $imageBlockImage['id'];
$imageBlockImageUrl = wp_get_attachment_url($imageBlockImageId);
$imageBlockImageAlt = $imageBlockImage['alt'];
$imageBlockImageWidth = $imageBlockImage['width'];

// get caption value
$imageBlockCaption = get_sub_field('image-block-caption');
?>

<!-- .image-with-caption -->
<figure class="image-with-caption" <?php if ($imageBlockImageWidth < 770) echo 'style="width: ' . $imageBlockImageWidth . 'px"'; ?>>
	<img src="<?php echo $imageBlockImageUrl; ?>" alt="<?php echo $imageBlockImageAlt; ?>">
	<?php if(!empty($imageBlockCaption)): ?>
	<figcaption class="image-with-caption__caption">
		<?php echo $imageBlockCaption; ?>
	</figcaption>
	<?php endif ?>
</figure>
<!-- /.image-with-caption -->