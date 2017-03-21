<?php

// Add fields to the standard api responses
add_action('rest_api_init', 'travelaer_api_custom_post_fields');
function travelaer_api_custom_post_fields()
{
    register_rest_field('post',
        't_author',
        array(
            'get_callback' => 'travelaer_get_author_info',
            'update_callback' => null,
            'schema' => null,
        )
    );
    register_rest_field('post',
        't_categories',
        array(
            'get_callback' => 'travelaer_get_category_info',
            'update_callback' => null,
            'schema' => null,
        )
    );
    register_rest_field('post',
        't_comments_info',
        array(
            'get_callback' => 'travelaer_get_comments_info',
            'update_callback' => null,
            'schema' => null,
        )
    );
    register_rest_field('post',
        't_featured_image',
        array(
            'get_callback' => 'travelaer_get_featured_image',
            'update_callback' => null,
            'schema' => null,
        )
    );
    register_rest_field('page',
        't_display_sub_menu',
        array(
            'get_callback' => 'travelaer_display_submenu',
            'update_callback' => null,
            'schema' => null,
        )
    );
}

function travelaer_display_submenu($object)
{
    $children = get_pages(array( 'child_of' => $object['id'] ));
    if (count($children) || $object['parent'] > 0) {
        return true;
    } else {
        return false;
    }
}

function travelaer_get_author_info($object)
{
    $user_id = travelaer_get_value($object, 'author');
    $author['avatar'] = get_field('avatar', 'user_'.$user_id);
    $author['description'] = get_the_author_meta('description');
    $author['name'] = get_the_author();

    return $author;
}

function travelaer_get_id($post) {
  if (isset($post['ID'])) {
    return $post['ID'];
  } else {
    return $post['id'];
  }
}

function travelaer_get_value($object, $key) {
  if (isset($object[$key])) {
      return $object[$key];
  } else {
      return $object['post_'.$key];
  };
}

function travelaer_get_category_info($object)
{
    $post_id = travelaer_get_id($object);
    $args = array('fields' => 'names');
    $categories = wp_get_post_categories($post_id, $args);

    foreach ($categories as $key => &$category) {
      if ('Uncategorized' === $category) {
          array_splice($categories, $key, 1);
      }
    };
    return $categories;
}

function travelaer_get_featured_image($object)
{
    if (empty($object['featured_media'])) {
        $default_image = get_field('fabImg', 'options');
        $image_object = $default_image;
    } else {
        $image_object = acf_get_attachment($object['featured_media']);
    }
    return $image_object;
}

function travelaer_get_comments_info($object)
{
    $post_id = travelaer_get_id($object);
    $comments = get_comments(array(
      'status' => 'approve',
      'post_id' => $post_id
    ));
    $t_comments_info['total'] = count($comments);

    if (empty($comments)) {
        return $t_comments_info;
    }

    foreach ($comments as $k => &$v) {
        // Format the comment content in p tags
        $v->comment_content = wpautop($v->comment_content);
        $v->comment_author_avatar = get_avatar_url($v->comment_author_email);
        // Set the index to be equal to the id so we can reference it later
        $temp_comments[$v->comment_ID] = $v;
    }

    foreach ($temp_comments as $k => &$v) {
        if ($v->comment_parent != 0) {
            $parent_index = ($v->comment_parent);
            $temp_comments[$parent_index] = (array) $temp_comments[$parent_index];
            $temp_comments[$parent_index]['comment_replies'][] = &$v;
            $temp_comments[$parent_index] = (object) $temp_comments[$parent_index];
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

add_filter('rest_prepare_page', 'travelaer_rest_prepare', 20, 3);
function travelaer_rest_prepare($response, $post, $request)
{
    $content_blocks = &$response->data['acf']['contentBlocks'];
    $tpaas_blocks = &$response->data['acf']['travelPaasContent'];
    $include_latest_posts = &$response->data['acf']['latest_posts'];

    if ($include_latest_posts) {
        $args = array(
          'numberposts' => 2,
          'post_type' => 'post',
          'post_status' => 'publish',
        );
        $include_latest_posts = travelaer_add_post_fields(wp_get_recent_posts($args), false);
    }

    if (!empty($content_blocks)) {
        foreach ($content_blocks as &$content_block) {
            // Note: $content_block is assigned by reference
        switch ($content_block['acf_fc_layout']) {
          case 'mosaic_team':
          case 'mosaic':
            $tiles = $content_block['tiles'];
            $tiles = travelaer_add_acf($tiles);
            foreach ($tiles as &$tile) {
                if (isset($tile['acf']['type']) && $tile['acf']['type'] === 'quote') {
                    $quote = travelaer_get_fields($tile['acf']['quote']);
                    $tile['acf'] = array_merge($tile['acf'], $quote['acf']);
                }
            }
            $content_block['tiles'] = $tiles;
            break;

          case 'team':
            $content_block['members'] = travelaer_add_acf($content_block['members']);
            break;

          case 'products':
            $content_block['products'] = travelaer_add_acf($content_block['products']);
            break;

          case 'quotes':
            $content_block['quotes'] = travelaer_add_acf($content_block['quotes']);
            break;

          case 'news':
            $args = array(
              'numberposts' => 5,
              'post_type' => 'post',
              'post_status' => 'publish',
              'category_name' => 'news',
            );
            $content_block['news'] = travelaer_add_post_fields(wp_get_recent_posts($args), true);
            break;

          default:
            break;
        }
        }
    }
    if (!empty($tpaas_blocks)) {
        foreach ($tpaas_blocks as &$tpaas_block) {
            switch ($tpaas_block['acf_fc_layout']) {
              case 'quote_graphs':
                foreach ($tpaas_block['quotes'] as &$quote) {
                    $quote = travelaer_get_fields($quote['quote']);
                }
                break;

              default:
                break;

            }
        }
    }
    return $response;
}

function travelaer_add_acf($item_ids)
{
    $items = [];
    foreach ($item_ids as $item_id) {
        $item = travelaer_get_fields($item_id);
        $items[] = $item;
    }
    return $items;
}

function travelaer_get_fields($item_id)
{
    $item = array(
    'id' => $item_id,
    'acf' => get_fields($item_id),
    'title' => get_the_title($item_id),
    'content' => travelaer_get_the_content_by_id($item_id),
  );
    return $item;
}

function travelaer_get_the_content_by_id($post_id)
{
    $page_data = get_page($post_id);
    if ($page_data) {
      // return wpautop($page_data->post_content);
      return apply_filters('the_content', $page_data->post_content);
    } else {
        return false;
    }
}

function travelaer_add_site_info($data)
{
    $t_site_info = array(
    'name' => get_bloginfo('name'),
    'description' => get_bloginfo('description'),
    'charset' => get_bloginfo('charset'),
    'language' => get_bloginfo('language'),
    'url' => get_bloginfo('url'),
  );
    $data['acf']['t_site_info'] = $t_site_info;
    return $data;
}
add_filter('acf/rest_api/option/get_fields', 'travelaer_add_site_info');

function travelaer_add_post_fields($posts, $include_content) {
  foreach ($posts as &$post) {
      $post_id = travelaer_get_id($post);
      $post['featured_media'] = get_post_thumbnail_id($post_id);
      $temp_post['id'] = $post_id;
      $temp_post['link'] = get_permalink($post_id);
      $temp_post['title'] = $post['post_title'];
      $temp_post['date_gmt'] = $post['post_date_gmt'];
      $temp_post['t_featured_image'] = travelaer_get_featured_image($post);
      $temp_post['t_author'] = travelaer_get_author_info($post);
      $temp_post['t_comments_info']['total'] = $post['comment_count'];
      $temp_post['t_categories'] = travelaer_get_category_info($post);
      !$include_content ?: $temp_post['t_excerpt'] = travelaer_get_the_content_by_id($post_id);
      $post = $temp_post;
  }
  return $posts;
}


function travelaer_acf_format_tax_slug($value)
{
    if (!empty($value)) {
        $value = get_term($value)->slug;
    }
    return $value;
}
add_filter('acf/format_value/type=taxonomy', 'travelaer_acf_format_tax_slug', 10, 3);

// add_filter('rest_cache_headers', function ($headers) {
//     $headers['Cache-Control'] = 'public, max-age=3600';
//     return $headers;
// });

add_filter('rest_allow_anonymous_comments', '__return_true');
