<?php

$_fileObj = get_sub_field( 'file' );

if($_fileObj):

	$_path = get_attached_file( $_fileObj['id'] );
	$_fi = new finfo(FILEINFO_MIME_TYPE);
	$_finfo = $_fi->file( $_path );
	$_filesize = human_filesize( filesize( $_path ), 1 );


	if( get_sub_field( 'link_text' ) ):
		$_linkText = get_sub_field( 'link_text' );
	else:
		$_linkText = 'Download file';
	endif;

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
	<div class="col-xs-12">

		<a href="<?php echo $_fileObj['url']; ?>" download class="btn btn_outlined btn_download btn_icon-right">
			<span><?php _e($_linkText, 'charitypress_fonzie'); ?> <span><?php printf( '(%s%s)', $_filesize, $_format) ;?></span></span>
			<i class="icon"><?php include( fonzie_svg_path( "cloud-download.svg" ) ); ?></i>
		</a>

	</div>
</div>

<?php endif; ?>