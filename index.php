<?php
    $srcVersion = md5(time());
    $webProtocol = 'http';
    if ((isset($_SERVER['HTTPS'])) && ($_SERVER['HTTPS'] == 'on')) {
        $webProtocol = 'https';
    }
    $srvName = $_SERVER['SERVER_NAME'];
    if (strlen($srvName) == 0) {
      $srvName = $_SERVER['SERVER_ADDR'];
    }
    $tmpURL = $webProtocol.'://'.$srvName.$_SERVER['PHP_SELF'];
    if ($tmpURL[strlen ($tmpURL)-1] == '/')
      $tmpURL = substr($tmpURL, 0, -1);
    $webURL = substr($tmpURL, 0, -strlen('index.php'));
    if (strlen($_SERVER['QUERY_STRING']) > 0) {
        require_once($_SERVER['QUERY_STRING'].'.php');
    } else {
        require_once('menu.php');
    }
