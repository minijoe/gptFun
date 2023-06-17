<?php

if (isset($_GET['city'])) {
    $r = array();
    if (isset($_GET['province'])) {
        $d = json_decode(file_get_contents('https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=' . $_GET['province'] . '&city=' . $_GET['city'] . '&county='), true);
        $d['data']['province'] = $_GET['province'];
        $d['data']['city'] = $_GET['city'];
        $d['data']['county'] = '';
        $r[] = $d['data'];
        echo json_encode($r);
        exit;
    }
    $j = json_decode(file_get_contents('https://wis.qq.com/city/like?source=pc&city=' . $_GET['city']), true);
    $data = $j['data'];

    if ($data != array()) {

        foreach ($data as $key => $value) {
            $arr = explode(',', str_replace(' ', '', $value));
            $d = json_decode(file_get_contents('https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=' . @$arr[0] . '&city=' . @$arr[1] . '&county=' . @$arr[2]), true);
            $d['data']['province'] = @$arr[0];
            $d['data']['city'] = @$arr[1];
            $d['data']['county'] = @$arr[2];
            //$r[] = $d['data'];
            array_unshift($r, $d['data']);
        }
    }
    //array_reverse($r, true);
    echo json_encode($r);
}