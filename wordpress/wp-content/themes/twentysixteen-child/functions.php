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

// Change the displayed name for content blocks
add_filter('acf/fields/flexible_content/layout_title', 'travelaer_flexible_content_layout_title', 10, 4);
function travelaer_flexible_content_layout_title( $title, $field, $layout, $i ) {

  if( $text = get_sub_field('title') ) {
	} elseif ($text = get_sub_field('headline')) {
	}
	return $title . ' | ' . $text;
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
        # code...
        break;
    }

    return $title;
}

add_action( 'rest_api_init', 'travelaer_api_custom_post_fields' );
function travelaer_api_custom_post_fields() {
    register_rest_field( 'post',
        't_author',
        array(
            'get_callback'    => 'travelaer_get_author_info',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        't_tags',
        array(
            'get_callback'    => 'travelaer_get_tag_info',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        't_comments_info',
        array(
            'get_callback'    => 'travelaer_get_comments_info',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        't_featured_image',
        array(
            'get_callback'    => 'travelaer_get_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function travelaer_get_author_info( $object, $field_name, $request ) {
    $user_id = $object['author'];
    $author['avatar'] = get_field('avatar', 'user_' . $user_id);
    $author['description'] = get_the_author_meta('description');
    $author['name'] = get_the_author();
    return $author;
}

function travelaer_get_tag_info( $object, $field_name, $request ) {
  $tags = [];
    foreach ($object['tags'] as $id) {
      $tag = get_tag($id)->name;
      $tags[] = $tag;
    }
    return $tags;
}

function travelaer_get_featured_image( $object, $field_name, $request ) {
  $image_data = wp_get_attachment_image_src(get_post_thumbnail_id( $object['id'] ), "large" );
  $image = array(
    'url' => $image_data[0],
    'width' => $image_data[1],
    'height' => $image_data[2],
   );

  return $image;
}

function travelaer_get_comments_info($object, $field_name, $request) {
  $comments = get_approved_comments($object['id']);
  $t_comments_info['total'] = count($comments);

  if(empty($comments)) {
    return $t_comments_info;
  }


  foreach ($comments as $k => &$v) {
    // Format the comment content in p tags
    $v->comment_content = wpautop($v->comment_content);
    // Set the index to be equal to the id so we can reference it later
    $temp_comments[$v->comment_ID] = $v;
  }

  foreach ($temp_comments as $k => &$v) {
    if ($v->comment_parent != 0) {
      $parent_index = ($v->comment_parent);
      $temp_comments[$parent_index] = (array)$temp_comments[$parent_index];
      $temp_comments[$parent_index]['comment_replies'][] =& $v;
      $temp_comments[$parent_index] = (object)$temp_comments[$parent_index];
    }
  }
  unset($v);

  foreach ($temp_comments as $k => $v) {
    if ($v->comment_parent != 0) {
      unset($temp_comments[$k]);
    }
  }

  // Convert back to a standard index format that JS understands as an array
  foreach ($temp_comments as $v) {
    $t_comments_info['comments'][] = $v;
  }

  return $t_comments_info;
}

function pp($a)
{
    echo '<pre style="background-color:white;">'.print_r($a, 1).'</pre>';
}

add_action( 'init', 'handle_preflight' );

function handle_preflight() {
    header("Access-Control-Allow-Origin: " . get_http_origin());
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Credentials: true");

    if ( 'OPTIONS' == $_SERVER['REQUEST_METHOD'] ) {
        status_header(200);
        exit();
    }
}
