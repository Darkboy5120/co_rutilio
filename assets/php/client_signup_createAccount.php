<?php
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if (isset($_POST['username'])
	&& isset($_POST['email'])
	&& isset($_POST['phone'])
	&& isset($_POST['password'])) {
		
	$username = $_POST['username'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$password = md5($_POST['password']);

	$mi0->query('
		SELECT
			id
		FROM
			Clients
		WHERE
			username = ? OR email = ? OR phone = ?',
		$username,
		$email,
		$phone
		);
	if ($mi0->result->num_rows > 0) {
		echo -1; $mi0->close(TRUE);//duplicated att
	}

	$mi0->query('
		INSERT INTO
			Clients
			(username, email, phone, password)
		VALUES
			(?, ?, ?, ?)',
		$username,
		$email,
		$phone,
		$password
		);
	if ($mi0->result === TRUE) {
		echo 1;//account created
	} else {
		echo 0;//generic error
	}
	$mi0->close();
}