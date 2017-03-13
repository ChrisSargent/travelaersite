<?php
/**
 * Travelaer Theme
 * The main site uses a React.js front-end and the Wordpress JSON API
 *
 *
 * @link https://codex.wordpress.org/Theme_Development
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 */


// add_action('init', 'travelaer_handle_preflight');
// function travelaer_handle_preflight()
// {
//     wlog(get_http_origin());
//     header('Access-Control-Allow-Origin: '.get_http_origin());
//     header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
//     header('Access-Control-Allow-Credentials: true');
// }


require_once 'travelaer-wp.php';
require_once 'travelaer-api.php';
require_once 'shortcodes.php';

// Write to the error log
function wlog($log)
{
    if (is_array($log) || is_object($log)) {
        error_log(print_r($log, true));
    } else {
        error_log($log);
    }
}
