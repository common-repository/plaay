<?php
    if(!isset($_POST['search'])) die();
    if(!isset($_POST['search_type'])) die();

    $keyword = $_POST['search'];
    $type = $_POST['search_type'];

    $data = array('api_key' => 'adskjnbka1_adsbado19129', 'auth_key' => '-', 'search' => $keyword, 'search_type' => $type, 'embed' => true, 'flash' => true);

    $ch = curl_init();
    $obj = new stdClass();

    curl_setopt($ch, CURLOPT_URL, 'http://www.plaay.com.br/api/webpage_search');
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $output = curl_exec($ch);

    curl_close($ch);

    $obj = array('results' => $output);

    return $obj;
?>