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
