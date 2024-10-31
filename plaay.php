<?php
/*
Plugin Name: Plaay
Plugin URI: http://www.plaay.com.br/
Description: Adicionar músicas ou lista de músicas
Version: 1.0.1
License: GPL
Author: Plaay
Author URI: http://www.plaay.com.br/
Text Domain: plaay
*/

function add_style(){
	wp_enqueue_style('style', '/wp-content/plugins/plaay/css/style.css');
}
add_action('init', 'add_style');

function add_main_script(){
	wp_enqueue_script('main', '/wp-content/plugins/plaay/js/main.js');
}
add_action('init', 'add_main_script');

function add_plugin_script(){
	wp_enqueue_script('plaay', '/wp-content/plugins/plaay/js/plaay.js');
}
add_action('init', 'add_plugin_script');

function create_insert_button(){
	return '<a href="#TB_inline?width=640&inlineId=popup_container" id="insert-list-music" class="button thickbox" title="Inserir Música ou Lista de Músicas"><span></span>Inserir Músicas</a>';
}
add_action('media_buttons_context', 'create_insert_button');

function add_inline_popup_content(){
	include 'html-content.php';
}
add_action('admin_footer', 'add_inline_popup_content');


?>