<?php

function rd_embed_html( $html ) {
    return '<div class="embed-container">' . $html . '</div>';
}
add_filter( 'embed_oembed_html', 'rd_embed_html', 10, 3 );
add_filter( 'video_embed_html', 'rd_embed_html' ); // Jetpack