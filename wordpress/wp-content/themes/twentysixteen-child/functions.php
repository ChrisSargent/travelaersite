<?php
/**
 * Travelaer Theme - an Extension of the standard Twenty Sixteen Theme
 * The main site uses a React.js front-end and the Wordpress JSON API
 * *.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 */

require_once 'travelaer-api.php';

add_filter( 'twentysixteen_content_width', function( $content_width )
{
    // Override the default 840 content width
    $content_width = 2000;

    return $content_width;
} );

add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');
function my_theme_enqueue_styles()
{
    wp_enqueue_style('parent-style', get_template_directory_uri().'/style.css');
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

// Change the displayed name for content blocks
add_filter('acf/fields/flexible_content/layout_title', 'travelaer_flexible_content_layout_title', 10, 4);
function travelaer_flexible_content_layout_title($title, $field, $layout, $i)
{
    if ($text = get_sub_field('title')) {
    } elseif ($text = get_sub_field('headline')) {
    }

    return $title.' | '.$text;
}

// Changes the title placeholder text on some custom post types
add_filter('enter_title_here', 'travelaer_title_placeholders');
function travelaer_title_placeholders($title)
{
    $screen = get_current_screen();
    switch ($screen->post_type) {
      case 'team_member':
        $title = 'Enter Name';
        break;

      default:
        // code...
        break;
    }

    return $title;
}

add_action('init', 'remove_default_image_sizes');

function remove_default_image_sizes() {
    remove_image_size('medium');
    remove_image_size('medium_large');
}


// Put inline images into figures - removing the default inline style that WP put on normally
add_filter( 'img_caption_shortcode', 'my_img_caption_shortcode', 10, 3 );
function my_img_caption_shortcode( $empty, $attr, $content ){
	$attr = shortcode_atts( array(
		'id'      => '',
		'align'   => 'alignnone',
		'width'   => '',
		'caption' => ''
	), $attr );

	if ( 1 > (int) $attr['width'] || empty( $attr['caption'] ) ) {
		return '';
	}

	if ( $attr['id'] ) {
		$attr['id'] = 'id="' . esc_attr( $attr['id'] ) . '" ';
	}

	return '<figure ' . $attr['id']
	. 'class="wp-caption ' . esc_attr( $attr['align'] ) . '">'
	. do_shortcode( $content )
	. '<figcaption class="wp-caption-text">' . $attr['caption'] . '</figcaption>'
	. '</figure>';
}

function pp($a)
{
    echo '<pre style="background-color:white;">'.print_r($a, 1).'</pre>';
}

function wlog($log)
{
    if (is_array($log) || is_object($log)) {
        error_log(print_r($log, true));
    } else {
        error_log($log);
    }
}
