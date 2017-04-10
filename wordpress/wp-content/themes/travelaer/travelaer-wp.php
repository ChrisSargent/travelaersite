<?php

if (! function_exists('travelaer_theme_setup')) {
    function travelaer_theme_setup()
    {
    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */

    add_theme_support('title-tag');


    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
     */

    add_theme_support('post-thumbnails');
        set_post_thumbnail_size(1200, 9999);


    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */

    add_theme_support('html5', array(
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    }

    function travelaer_register_menus() {
      register_nav_menus(
        array(
          'primary' => __( 'Primary Menu' )
        )
      );
    }
  add_action( 'init', 'travelaer_register_menus' );
}
add_action('after_setup_theme', 'travelaer_theme_setup');

/**
 * Sets the content width in pixels, based on the theme's design and stylesheet.
 * Priority 0 to make it available to lower priority callbacks.
 */

function travelaer_content_width()
{
    $GLOBALS['content_width'] = apply_filters('travelaer_content_width', 2000);
}
add_action('after_setup_theme', 'travelaer_content_width', 0);


/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param array  $size  Image size. Accepts an array of width and height
 *                      values in pixels (in that order).
 * @return string A source size value for use in a content image 'sizes' attribute.
 */

function twentysixteen_content_image_sizes_attr($sizes, $size)
{
    global $post;
    if ($post->post_type === 'post') {
      $sizes = '(min-width: 630px) 600px, (min-width: 840px) 64vw, (min-width: 1120px) 675px, 100vw';
    }
    return $sizes;
}
add_filter('wp_calculate_image_sizes', 'twentysixteen_content_image_sizes_attr', 10, 2);


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
    $text = get_sub_field('title');

    if (!$text) {
        $text = get_sub_field('headline');
    }

    if (!$text) {
        return $title;
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


add_action('init', 'travelaer_add_blur_preview_size');
function travelaer_add_blur_preview_size()
{
    add_image_size('preview', 20, 20);
}


add_filter('wp_generate_attachment_metadata', 'travelaer_create_preview_blob_without_EWWW', 10, 2);
function travelaer_create_preview_blob_without_EWWW($meta, $id)
{
    if (is_plugin_active('ewww-image-optimizer')) {
        return $meta;
    } else {
        $date = substr($meta['file'], 0, 7);
        $uploaddir = wp_upload_dir($date);
        $filename = $meta['sizes']['preview']['file'];
        $preview = trailingslashit($uploaddir['path']) . $filename;
        $file_content = base64_encode(file_get_contents($preview));
        travelaer_save_preview_blob_post_content($id, $file_content);
        return $meta;
    }
}


add_action('ewww_image_optimizer_post_optimization', 'travelaer_create_preview_blob_with_EWWW', 10, 2);
function travelaer_create_preview_blob_with_EWWW($fileName)
{
    if (strpos($fileName, '-20x') !== false) {
        $file_content = base64_encode(file_get_contents($fileName));
        $id = travelaer_get_preview_blob_attachment_id($fileName);
        travelaer_save_preview_blob_post_content($id, $file_content);
    }
    return $fileName;
}


function travelaer_save_preview_blob_post_content($id, $blob)
{
    $image_blob = array(
      'ID'           => $id,
      'post_content' => $blob,
  );
    wp_update_post($image_blob);
}


/**
 * Get an attachment ID given a URL.
 *
 * @param string $url
 *
 * @return int Attachment ID on success, 0 on failure
 */
function travelaer_get_preview_blob_attachment_id($url)
{
    $attachment_id = 0;
    $dir = wp_upload_dir();
    if (false !== strpos($url, $dir['basedir'] . '/')) { // Is URL in uploads directory?
        $file = basename($url);
        $query_args = array(
            'post_type'   => 'attachment',
            'post_status' => 'inherit',
            'fields'      => 'ids',
            'meta_query'  => array(
                array(
                    'value'   => $file,
                    'compare' => 'LIKE',
                    'key'     => '_wp_attachment_metadata',
                ),
            )
        );
        $query = new WP_Query($query_args);
        if ($query->have_posts()) {
            foreach ($query->posts as $post_id) {
                $meta = wp_get_attachment_metadata($post_id);
                $original_file       = basename($meta['file']);
                $cropped_image_files = wp_list_pluck($meta['sizes'], 'file');
                if ($original_file === $file || in_array($file, $cropped_image_files)) {
                    $attachment_id = $post_id;
                    break;
                }
            }
        }
    }
    return $attachment_id;
}

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
 	 */
	// add_editor_style( array( 'assets/css/editor-style.css', twentyseventeen_fonts_url() ) );


/**
 * Registers an editor stylesheet for the theme.
 */
function travleaer_theme_add_editor_styles() {
    add_editor_style();
}
add_action( 'admin_init', 'travleaer_theme_add_editor_styles' );


// Callback function to insert 'styleselect' into the $buttons array
function travelaer_mce_buttons_2( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}
add_filter( 'mce_buttons_2', 'travelaer_mce_buttons_2' );

function travelaer_mce_before_init_insert_formats( $init_array ) {
	$style_formats = array(
		// Each array child is a format with it's own settings
		array(
			'title' => 'Main Headline',
			'inline' => 'span',
			'classes' => 'emph',
		),
		array(
			'title' => 'Question',
			'inline' => 'span',
			'classes' => 'question',
		),
		array(
			'title' => 'Number',
			'inline' => 'span',
			'classes' => 'number',
		),
	);
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array['style_formats'] = json_encode( $style_formats );
	return $init_array;
}
add_filter( 'tiny_mce_before_init', 'travelaer_mce_before_init_insert_formats' );


function travelaer_comment_inserted($comment_id, $comment_object) {
  wp_notify_postauthor( $comment_id );
}

add_action('wp_insert_comment','travelaer_comment_inserted');
