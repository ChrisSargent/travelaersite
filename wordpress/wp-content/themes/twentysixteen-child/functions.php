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

require_once 'travelaer-wp.php';
require_once 'travelaer-api.php';

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
