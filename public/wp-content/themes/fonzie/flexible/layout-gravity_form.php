
<?php if( !is_page_template('templates/contact.php') ): ?>
<div class="row flexible-block">
    <div class="col-xs-12">
<?php endif; ?>
        <?php
        $form_object = get_sub_field('form');

        if( isset( $form_object[0] ) ):
            $form_object = $form_object[0];
        endif;

		$gformTitle = get_sub_field('show_form_title_gravity_form');
		$gformDesc = get_sub_field('show_form_description_gravity_form');

        gravity_form_enqueue_scripts($form_object['id'], true);
        gravity_form($form_object['id'], $gformTitle, $gformDesc, false, '', true, 1);
        ?>
<?php if( !is_page_template('templates/contact.php') ): ?>
    </div>
</div>
<?php endif; ?>
