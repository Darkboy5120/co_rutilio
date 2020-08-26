<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('provider_id') !== NULL
  || $ci0->getCookie('client_id') !== NULL
  ) {

	$user_id = ($ci0->getCookie('provider_id') !== NULL) 
		? $ci0->getCookie('provider_id') !== NULL
		: $ci0->getCookie('client_id') !== NULL;

	$sql = ($ci0->getCookie('provider_id') !== NULL) 
		? 'SELECT id, username, email, restaurant, phone, description, levelpoints, url FROM Providers
			WHERE id = ?'
		: 'SELECT id, username, email, phone, credit, levelpoints, url FROM Clients
			WHERE id = ?';

	$mi0->query(
		$sql,
		$user_id
		);
	if ($mi0->result->num_rows > 0) {
		echo json_encode($mi0->result->fetch_assoc());
	} else {
		echo 0;
	}
	$mi0->close();
}