<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('provider_id') !== NULL
  && isset($_POST['id'])
  ) {

	$provider_id = $ci0->getCookie('provider_id');
	$table_id = $_POST['id'];

	//check if the user own the table
	$mi0->query('
		SELECT url FROM Tables
		WHERE id = ? AND provider_id = ?',
		$table_id,
		$provider_id
		);
	if ($mi0->result->num_rows == 0) {
		echo -1; $mi0->close(TRUE);//posibly hacker attack
	}
	$url = $mi0->result->fetch_assoc()['url'];

	//delete image
	if (!unlink($url)) {
		echo -2; $mi0->close(TRUE);
	}

	$mi0->query('
		DELETE FROM Tables
		WHERE id = ?',
		$table_id
		);
	if ($mi0->result === TRUE) {
		echo 1;
	} else {
		echo 0;
	}

	$mi0->close();
}