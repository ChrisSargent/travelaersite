<?php

// Override the default 840 content width
add_filter('twentysixteen_content_width', function ($content_width) {
    $content_width = 2000;
    return $content_width;
});


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

// Put inline images into figures - removing the default inline style that WP put on normally
add_filter('img_caption_shortcode', 'my_img_caption_shortcode', 10, 3);
function my_img_caption_shortcode($empty, $attr, $content)
{
    $attr = shortcode_atts(array(
        'id'      => '',
        'align'   => 'alignnone',
        'width'   => '',
        'caption' => ''
    ), $attr);

    if (1 > (int) $attr['width'] || empty($attr['caption'])) {
        return '';
    }

    if ($attr['id']) {
        $attr['id'] = 'id="' . esc_attr($attr['id']) . '" ';
    }

    return '<figure ' . $attr['id']
    . 'class="wp-caption ' . esc_attr($attr['align']) . '">'
    . do_shortcode($content)
    . '<figcaption class="wp-caption-text">' . $attr['caption'] . '</figcaption>'
    . '</figure>';
}

add_action('init', 'add_blur_preview_size');
function add_blur_preview_size()
{
    add_image_size('preview', 20, 20);
}

add_filter('wp_generate_attachment_metadata', 'create_preview_blob_without_EWWW', 10, 2);
function create_preview_blob_without_EWWW($meta, $id)
{
    if (is_plugin_active('ewww-image-optimizer')) {
        return $meta;
    } else {
        $date = substr($meta['file'], 0, 7);
        $uploaddir = wp_upload_dir($date);
        $filename = $meta['sizes']['preview']['file'];
        $preview = trailingslashit($uploaddir['path']) . $filename;
        $file_content = base64_encode(file_get_contents($preview));
        save_preview_blob_post_content($id, $file_content);
        return $meta;
    }
}

add_action('ewww_image_optimizer_post_optimization', 'create_preview_blob_with_EWWW', 10, 2);
function create_preview_blob_with_EWWW($fileName)
{
    if (strpos($fileName, '-20x') !== false) {
        $file_content = base64_encode(file_get_contents($fileName));
        $id = get_preview_blob_attachment_id($fileName);
        save_preview_blob_post_content($id, $file_content);
    }
    return $fileName;
}

function save_preview_blob_post_content($id, $blob)
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
function get_preview_blob_attachment_id( $url ) {
	$attachment_id = 0;
	$dir = wp_upload_dir();
	if ( false !== strpos( $url, $dir['basedir'] . '/' ) ) { // Is URL in uploads directory?
		$file = basename( $url );
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
		$query = new WP_Query( $query_args );
		if ( $query->have_posts() ) {
			foreach ( $query->posts as $post_id ) {
				$meta = wp_get_attachment_metadata( $post_id );
				$original_file       = basename( $meta['file'] );
				$cropped_image_files = wp_list_pluck( $meta['sizes'], 'file' );
				if ( $original_file === $file || in_array( $file, $cropped_image_files ) ) {
					$attachment_id = $post_id;
					break;
				}
			}
		}
	}
	return $attachment_id;
}
