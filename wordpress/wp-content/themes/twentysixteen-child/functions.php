<?php
/**
 * Travelaer Theme - an Extension of the standard Twenty Sixteen Theme
 * The main site uses a React.js front-end and the Wordpress JSON API
 * *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 */

add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}

// Add Theme Settings Tab to admin page.
if (function_exists('acf_add_options_page')) {
    acf_add_options_page('Theme Settings');
}

// Add Google Maps API Key for ACF to use
add_action('acf/init', 'travelaer_acf_init');
function travelaer_acf_init()
{
    $api_key = get_field('gMapsApiKey', 'option');
    acf_update_setting('google_api_key', $api_key);
}


function travelaer_flexible_content_layout_title( $title, $field, $layout, $i ) {

  if( $text = get_sub_field('title') ) {
	} elseif ($text = get_sub_field('headline')) {
	}
	return $title . ' | ' . $text;
	//
}

// name
add_filter('acf/fields/flexible_content/layout_title', 'travelaer_flexible_content_layout_title', 10, 4);

?>
