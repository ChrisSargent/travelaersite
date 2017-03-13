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

function travelaer_display_submenu($object, $field_name, $request)
{
    $children = get_pages(array( 'child_of' => $object['id'] ));
    if (count($children) || $object['parent'] > 0) {
        return true;
    } else {
        return false;
    }
}

function travelaer_get_author_info($object, $field_name, $request)
{
    $user_id = $object['author'];
    $author['avatar'] = get_field('avatar', 'user_'.$user_id);
    $author['description'] = get_the_author_meta('description');
    $author['name'] = get_the_author();

    return $author;
}

function travelaer_get_category_info($object, $field_name, $request)
{
    $categories = [];
    foreach ($object['categories'] as $id) {
        $category = get_the_category_by_ID($id);
        if ('Uncategorized' !== $category) {
            $categories[] = $category;
        }
    }

    return $categories;
}

function travelaer_get_featured_image($object, $field_name, $request)
{
    if (empty($object['featured_media'])) {
        $default_image = get_field('fabImg', 'options');
        $image_object = $default_image;
    } else {
        $image_object = acf_get_attachment($object['featured_media']);
    }
    return $image_object;
}

function travelaer_get_comments_info($object, $field_name, $request)
{
    $comments = get_comments(array('status' => 'approve', 'post_id' => $object['id']));
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
    // Note: $content_blocks is assigned by reference
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
            $members = $content_block['members'];
            $content_block['members'] = travelaer_add_acf($members);
            break;

          case 'products':
            $products = $content_block['products'];
            $content_block['products'] = travelaer_add_acf($products);
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
    'content' => get_the_content_by_id($item_id),
  );
    return $item;
}

function get_the_content_by_id($post_id)
{
    $page_data = get_page($post_id);
    if ($page_data) {
        return wpautop($page_data->post_content);
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
