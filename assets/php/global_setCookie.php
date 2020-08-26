<?php
require_once('../php/global_cookieInterface.php');

if (isset($_POST['key'])
	&& isset($_POST['value'])) {

	$key = $_POST['key'];
	$value = $_POST['value'];

	$ci0->setCookie($key, $value);

	echo 1;

}