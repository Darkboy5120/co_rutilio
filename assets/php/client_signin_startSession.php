<?php
require_once('../php/global_mysqlInterface.php');
require_once('../php/global_cookieInterface.php');
require_once('../php/users/root.php');

if (isset($_POST['usernameoremail'])
	&& isset($_POST['password'])) {

	$usernameoremail = $_POST['usernameoremail'];
	$password = md5($_POST['password']);
	
	$mi0->query('
		SELECT
			id
		FROM
			Clients
		WHERE
			(username = ? OR email = ?) AND password = ?',
		$usernameoremail,
		$usernameoremail,
		$password
		);
	if ($mi0->result->num_rows > 0) {
		$user_id = $mi0->result->fetch_assoc()['id'];

		$ci0->setCookie('client_id', $user_id);
			
		echo 1;
	} else {
		echo 0;//generic error
	}
	$mi0->close();
}