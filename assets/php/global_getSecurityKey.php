<?php
require_once('../php/global_mysqlInterface.php');
require_once('../php/global_cookieInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('security_key') !== NULL
	) {

	$security_key = $ci0->getCookie('security_key');
	echo json_encode($security_key);

}
