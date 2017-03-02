<?php

// Set the default content width
$content_width = 2000;

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
function travelaer_get_preview_blob_attachment_id( $url ) {
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