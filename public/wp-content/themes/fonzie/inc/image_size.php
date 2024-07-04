<?php

//block image sizes
add_image_size( 'block-image', 545, 321, true );
add_image_size( 'block-image--generic', 545, 422, true );
add_image_size( 'block-image--double', 720, 800, true );
add_image_size( 'block-image--portrait', 720, 540, true );
add_image_size( 'block-image--landscape', 940, 554, true );
add_image_size( 'block-image--square', 390, 390, true );
add_image_size( 'block-links', 135, 96, true );
add_image_size( 'block-hero-full', 2000 );
add_image_size( 'block-image--square-small', 124, 124, true );
add_image_size( 'block-image--publication', 288, 420, true );

//donation
add_image_size( 'donation', 514, 306, true );
add_image_size( 'donation-520-350', 520, 350, true );

//event listing
add_image_size( 'event--listing', 730, 413, true );

//post featured image
add_image_size( 'post-featured-image', 992, 561, true );

//homepage
add_image_size( 'homepage-header_top--third', 454, 388, true );
add_image_size( 'homepage-header_top--single', 666, 498, true );
add_image_size( 'logo-carousel', 200 );

/*  Thumbnail upscale
/* ------------------------------------ */
function alx_thumbnail_upscale( $default, $orig_w, $orig_h, $new_w, $new_h, $crop ){
        if ( !$crop ) return null; // let the wordpress default function handle this
        $aspect_ratio = $orig_w / $orig_h;
        $size_ratio = max($new_w / $orig_w, $new_h / $orig_h);
        $crop_w = round($new_w / $size_ratio);
        $crop_h = round($new_h / $size_ratio);
        $s_x = floor( ($orig_w - $crop_w) / 2 );
        $s_y = floor( ($orig_h - $crop_h) / 2 );
        return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
}
add_filter( 'image_resize_dimensions', 'alx_thumbnail_upscale', 10, 6 );
