<?php
require_once('../php/global_cookieInterface.php');
require_once('../php/global_mysqlInterface.php');
require_once('../php/users/root.php');

if ($ci0->getCookie('client_id') !== NULL
  && isset($_POST['id'])
  ) {

	$client_id = $ci0->getCookie('client_id');
	$restaurant_id = $_POST['id'];

	$mi0->query('
		SELECT client_id FROM Favorites
		WHERE client_id = ?',
		$client_id
		);
	if ($mi0->result->num_rows > 0) {
		$mi0->query('
			DELETE FROM Favorites
			WHERE client_id = ? AND restaurant_id = ?',
			$client_id,
			$restaurant_id
			);
		if ($mi0->result !== TRUE) {
			echo 0; $mi0->close(TRUE);
		}
	} else {
		$mi0->query('
			INSERT INTO Favorites (client_id, restaurant_id)
			VALUES (?, ?)',
			$client_id,
			$restaurant_id
			);
		if ($mi0->result !== TRUE) {
			echo 0; $mi0->close(TRUE);
		}
	}
	echo 1;
	$mi0->close(TRUE);
}