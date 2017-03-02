<?php

function travelaer_svg($atts)
{
    if(isset($atts['id'])) {
      $src = wp_get_attachment_image_src($atts['id'])[0];
      $svg = file_get_contents($src);
    }
    return $svg;
}
add_shortcode('svg', 'travelaer_svg');
