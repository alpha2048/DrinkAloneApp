<?php
/**
 * Created by alpha2048.
 * Date: 2017/06/17
 * Time: 11:23
 */
include 'ChromePhp.php';


$api_key = file_get_contents(__DIR__ . '/API_Key.txt');

//叩くURLを整える
$base_url = 'http://webapi.suntory.co.jp/barnavi/v2/shops?';

ChromePhp::log('get:');
ChromePhp::log($_GET);

$latitude = $_GET['lat'];
$longitude = $_GET['lng'];

if(!empty($latitude)){
//緯度経度で情報取得
    $latlng_query = array('key' => $api_key,
        'pattern' => 1,
        'lat' => $latitude,
        'lng' => $longitude,
        'type' => 4,
        'type' => 5,
        'range' => 1000,
        'format' => 'json',
        'url' => 'http://localhost:63342/DrinkAloneApp/getData.php');
}else {


    $latlng_query = array('key' => $api_key,
        'pattern' => 1,
        'lat' => 35.660768,
        'lng' => 139.757471,
        'type' => 4,
        'type' => 5,
        'range' => 1000,
        'format' => 'json',
        'url' => 'http://localhost:63342/DrinkAloneApp/getData.php');
}




$url = $base_url.http_build_query($latlng_query);
ChromePhp::log('url:');
ChromePhp::log($url);

//echo $url;
//echo "\n";

$response = file_get_contents($base_url.http_build_query($latlng_query));
$response_json = json_decode($response,true);

$shop = $response_json['shops']['shop'];

//とりあえずjsonで返却
header('Content-type: application/json');
echo json_encode( $shop );

